-- Create customers table for connecting stripe customer ids to supabase users
create table if not exists customers (
  user_id uuid not null references auth.users,
  stripe_customer_id text not null
);
-- Enable row level security for customers table
alter table customers enable row level security;
-- Create products table for storing product information
create table if not exists products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);
alter table products enable row level security;
create policy "Allow public read-only access." on products for select using (true);
-- Enable row level security for customers table
alter table products enable row level security;

-- Create products table for storing product information
create type pricing_type as enum ('one_time', 'recurring');
create type pricing_plan_interval as enum ('day', 'week', 'month', 'year');
create table if not exists prices (
  id text primary key,
  product_id text references products, 
  active boolean,
  description text,
  unit_amount bigint,
  currency text check (char_length(currency) = 3),
  type pricing_type,
  interval pricing_plan_interval,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);
-- Enable row level security for customers table
alter table prices enable row level security;
create policy "Allow public read-only access" on prices for select using (true);

-- Create subscription table for storing stripe subscriptions for users
create type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'paused', 'unpaid');
create table if not exists subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status subscription_status,
  metadata jsonb,
  product_id text references products,
  price_id text references prices,
  quantity integer,
  cancel_at_period_end boolean,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  trial_end timestamp with time zone default timezone('utc'::text, now())
);
-- Enable row level security for customers table
alter table subscriptions enable row level security;
create policy "User can read own subscription" on subscriptions for select using (auth.uid() = user_id);

-- Create clients table
create table if not exists clients (
  id uuid not null primary key DEFAULT uuid_generate_v4(),
  name text not null,
  email text,
  phone text,
  user_id uuid not null references auth.users DEFAULT auth.uid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable row level security for clients
alter table clients enable row level security;
-- Create policy for clients that users can only create/read/update/delete their own clients
drop policy if exists "Users can only access their own clients" on clients;
create policy "Users can only access their own clients" on clients for all using (auth.uid() = user_id);
