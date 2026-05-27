-- ============================================
-- Arus Expense Management CRM — Database Setup
-- Run this in the Supabase SQL Editor (one-shot, idempotent).
-- ============================================

-- ----------------------------------------------------------------
-- 0. EXTENSIONS
-- ----------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. CLEAN SLATE (safe re-run — drops old tables/policies)
-- ============================================================
DROP TABLE IF EXISTS public.expenses CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ============================================================
-- 2. PROFILES TABLE  (1:1 with auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  email       TEXT NOT NULL UNIQUE,
  department  TEXT,
  role        TEXT NOT NULL DEFAULT 'employee'
              CHECK (role IN ('employee', 'approver', 'admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_role       ON public.profiles(role);
CREATE INDEX idx_profiles_department ON public.profiles(department);

-- ============================================================
-- 3. EXPENSES TABLE
-- ============================================================
CREATE TABLE public.expenses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  category      TEXT NOT NULL
                CHECK (category IN (
                  'Airfare', 'Hotel', 'Meals', 'Ground Transport',
                  'Car Rental', 'Fuel', 'Conference', 'Office Supplies',
                  'Client Meeting', 'Other'
                )),
  amount        NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency      TEXT NOT NULL DEFAULT 'USD'
                CHECK (currency IN ('USD', 'COP', 'EUR', 'GBP')),
  expense_date  DATE NOT NULL,
  receipt_url   TEXT,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  approved_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_expenses_user_id   ON public.expenses(user_id);
CREATE INDEX idx_expenses_status    ON public.expenses(status);
CREATE INDEX idx_expenses_category  ON public.expenses(category);
CREATE INDEX idx_expenses_date_desc ON public.expenses(expense_date DESC);

-- Auto-update updated_at on UPDATE
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_expenses_updated_at
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- 4. AUTO-PROVISION PROFILE ON SIGN-UP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, department, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'department', 'Unassigned'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 5. ROLE HELPER  (avoids recursive RLS lookups)
-- ============================================================
CREATE OR REPLACE FUNCTION public.current_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses  ENABLE ROW LEVEL SECURITY;

-- ---- PROFILES ----------------------------------------------
-- Users can read their own profile
CREATE POLICY "profiles_self_select"
  ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Approvers and admins can read every profile
CREATE POLICY "profiles_staff_select"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.current_role() IN ('approver', 'admin'));

-- Users can update their own profile (cannot change role)
CREATE POLICY "profiles_self_update"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Admins can update any profile (including role changes)
CREATE POLICY "profiles_admin_update"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.current_role() = 'admin')
  WITH CHECK (public.current_role() = 'admin');

-- ---- EXPENSES ----------------------------------------------
-- Users insert their own expenses only
CREATE POLICY "expenses_self_insert"
  ON public.expenses FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users read their own expenses
CREATE POLICY "expenses_self_select"
  ON public.expenses FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Approvers / admins read everything
CREATE POLICY "expenses_staff_select"
  ON public.expenses FOR SELECT TO authenticated
  USING (public.current_role() IN ('approver', 'admin'));

-- Approvers / admins can update (approve / reject)
CREATE POLICY "expenses_staff_update"
  ON public.expenses FOR UPDATE TO authenticated
  USING (public.current_role() IN ('approver', 'admin'))
  WITH CHECK (public.current_role() IN ('approver', 'admin'));

-- Owners can delete their own pending expenses
CREATE POLICY "expenses_self_delete_pending"
  ON public.expenses FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND status = 'pending');

-- ============================================================
-- 7. OPTIONAL — promote the first user to admin manually:
--   UPDATE public.profiles SET role = 'admin' WHERE email = 'you@arus.com';
-- ============================================================
