import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://unppadmztmqjwtskagvq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVucHBhZG16dG1xand0c2thZ3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTgzOTksImV4cCI6MjA2NjQzNDM5OX0.4YY3l7jbIJLXQz1qB8gE5VBNc-O0i45eKCPD9r0Y1og'

export const supabase = createClient(supabaseUrl, supabaseKey)

