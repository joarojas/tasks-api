create table public.tasks (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 1 and 200),
  done boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.tasks enable row level security;
grant all on public.tasks to service_role;
insert into public.tasks (title) values ('Tarea 1'), ('Tarea 2'), ('Tarea 3');