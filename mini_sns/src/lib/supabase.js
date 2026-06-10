import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wryuebyryshwdienhuje.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyeXVlYnlyeXNod2RpZW5odWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTc0NTcsImV4cCI6MjA5NjQzMzQ1N30.hnqoezXIVrXgeQhuGFvAoGLBhVfJP90RbZn-t1HTOQM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
