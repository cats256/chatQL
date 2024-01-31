import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; is index.ts for whatever reason i forgot
Do npm run dev to start the server
Add hashing and indexing to improve performance
Look up what column-level privileges are
Change type any         createUsername: async function (_: any, args: { username: string }, context: any): Promise<any> {},
