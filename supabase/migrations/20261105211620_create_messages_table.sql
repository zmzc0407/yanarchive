/*
# Create messages table for 延为心声 (visitor messages board)

This is a public, no-auth visitor messages board for the YAN ARCHIVE darkroom site.
No sign-in is required — visitors can post messages with an optional nickname.
All messages are public and intentionally shared (single-tenant model).

1. New Tables
- `messages`
  - `id` (uuid, primary key, auto-generated)
  - `nickname` (text, the sender's display name; defaults to '匿名延声')
  - `content` (text, the message body; NOT NULL, max 300 chars enforced at app layer)
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `messages`.
- Grant SELECT, INSERT to `anon` + `authenticated` so the Data API can reach the table.
  (No UPDATE or DELETE — messages are archived permanently, per the design requirement
  "这里的声音会被归档，不会被删除".)
- Allow anon + authenticated to SELECT all rows (public board) and INSERT new rows
  (public posting). No UPDATE or DELETE policies — rows are immutable once archived.
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL DEFAULT '匿名延声',
  content text NOT NULL CHECK (char_length(content) <= 300),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_messages" ON messages;
CREATE POLICY "anon_select_messages"
  ON messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages"
  ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
