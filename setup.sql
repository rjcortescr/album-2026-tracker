-- Setup de base de datos para Album 2026 Tracker
-- Ejecutar este script completo en el SQL Editor de Supabase

-- Tabla principal: cada usuario tiene su propio álbum
create table public.albums (
  user_id uuid references auth.users(id) on delete cascade primary key,
  collection jsonb default '{}'::jsonb,
  special jsonb default '{}'::jsonb,
  extra jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Activar Row Level Security para que cada usuario solo vea su album
alter table public.albums enable row level security;

-- Políticas de acceso
create policy "Users can read own album" on public.albums
  for select using (auth.uid() = user_id);

create policy "Users can insert own album" on public.albums
  for insert with check (auth.uid() = user_id);

create policy "Users can update own album" on public.albums
  for update using (auth.uid() = user_id);

-- Función que crea automáticamente un album vacío al registrarse un nuevo usuario
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.albums (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que ejecuta la función cada vez que se registra un usuario
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
