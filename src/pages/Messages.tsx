import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Archive, Heart, AlertCircle, Loader2 } from 'lucide-react';
import { SubPageHeader } from '@/components/SubPageHeader';
import { Twikoo } from '@/components/Twikoo';
import { supabase } from '@/lib/supabase';
import type { Message } from '@/types';

const MAX_CONTENT = 300;

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortNewest, setSortNewest] = useState(true);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('messages')
      .select('id, nickname, content, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('无法加载留言档案，请稍后再试');
    } else if (data) {
      setMessages(data as Message[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (content.length > MAX_CONTENT) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      nickname: nickname.trim() || '匿名延声',
      content: content.trim(),
    };

    const { data, error: insertError } = await supabase
      .from('messages')
      .insert(payload)
      .select('id, nickname, content, created_at')
      .single();

    if (insertError || !data) {
      setError('入档失败，请稍后再试');
      setSubmitting(false);
      return;
    }

    setMessages((prev) =>
      sortNewest ? [data as Message, ...prev] : [...prev, data as Message]
    );
    setNickname('');
    setContent('');
    setSubmitting(false);
  };

  const sortedMessages = sortNewest
    ? messages
    : [...messages].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

  return (
    <div>
      <SubPageHeader
        title="延为心声"
        subtitle="这里是自由落笔的角落。文字可以写给培延，可以写给你自己，可以写给同担，亦可以说予我。愿落笔皆存善意，恶意言辞将会被清理封存；每一段真诚留言，都将化作暗房底片旁一枚被珍藏的便签。"
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-10 pb-20">
        {/* ===== Form section ===== */}
        <div className="border border-darkroom-border/40 rounded-sm bg-darkroom-surface/20 p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Send className="w-4 h-4 text-darkroom-accent" />
            <h2 className="font-mono text-xs text-darkroom-muted tracking-widest2 uppercase">
              写一枚便签 / LEAVE A NOTE
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nickname */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-body text-sm text-darkroom-text">
                  寄信人昵称
                  <span className="font-mono text-[10px] text-darkroom-muted ml-2 tracking-wide">
                    （选填）
                  </span>
                </label>
                <span className="font-mono text-[10px] text-darkroom-muted tracking-wide">
                  字数上限 300
                </span>
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="例如：一只听戏的猫"
                maxLength={20}
                className="w-full bg-darkroom-bg/50 border border-darkroom-border/50 rounded-sm px-4 py-3 font-body text-sm text-darkroom-text placeholder:text-darkroom-muted/50 focus:outline-none focus:border-darkroom-accent/50 transition-colors"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-body text-sm text-darkroom-text">
                  档案话语内容
                  <span className="font-mono text-[10px] text-darkroom-accent ml-2 tracking-wide">
                    （必填）
                  </span>
                </label>
                <span className="font-mono text-[10px] text-darkroom-muted tracking-wide">
                  {content.length} / {MAX_CONTENT}
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, MAX_CONTENT))}
                placeholder="写下你想说的话，它会成为档案的一部分..."
                rows={5}
                required
                className="w-full bg-darkroom-bg/50 border border-darkroom-border/50 rounded-sm px-4 py-3 font-body text-sm text-darkroom-text placeholder:text-darkroom-muted/50 focus:outline-none focus:border-darkroom-accent/50 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Hint + submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-body text-xs text-darkroom-muted italic">
                <Heart className="w-3 h-3 inline mr-1 text-darkroom-accent/60" />
                拒绝社交媒体点赞机制，保持最纯粹的倾听
              </p>
              <button
                type="submit"
                disabled={submitting || !content.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-darkroom-accent/40 rounded-full font-mono text-xs text-darkroom-accent tracking-widest2 uppercase hover:bg-darkroom-accent/10 hover:border-darkroom-accent/70 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                投入入档
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-400/80">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* ===== Messages display ===== */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-darkroom-border/30">
            <div className="flex items-center gap-2">
              <Archive className="w-4 h-4 text-darkroom-accent" />
              <h2 className="font-serif text-lg font-bold text-darkroom-text">
                已归档心声
              </h2>
              <span className="font-mono text-xs text-darkroom-muted tracking-wide">
                ({messages.length})
              </span>
            </div>
            <button
              onClick={() => setSortNewest(!sortNewest)}
              className="font-mono text-[10px] text-darkroom-muted hover:text-darkroom-accent tracking-widest2 uppercase transition-colors"
            >
              {sortNewest ? '最新便签层上 ↓' : '最早便签层上 ↑'}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-5 h-5 text-darkroom-muted animate-spin" />
            </div>
          ) : sortedMessages.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-sm text-darkroom-muted">
                暗房尚未收到任何便签。
              </p>
              <p className="font-mono text-[10px] text-darkroom-muted/50 tracking-widest2 uppercase mt-2">
                BE THE FIRST TO LEAVE A NOTE
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-darkroom-border/30" />

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {sortedMessages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-3 top-5 -translate-x-1/2 w-2 h-2 rounded-full bg-darkroom-accent/60 ring-4 ring-darkroom-bg" />

                      {/* Card */}
                      <div className="border border-darkroom-border/30 rounded-sm bg-darkroom-surface/20 p-5 hover:border-darkroom-accent/30 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-body text-sm font-bold text-darkroom-text">
                            {msg.nickname}
                          </span>
                          <span className="font-mono text-[10px] text-darkroom-muted tracking-wide">
                            {formatDateTime(msg.created_at)}
                          </span>
                        </div>
                        <p className="font-body text-sm text-darkroom-text/70 leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-10 pb-20 mt-8">
        <Twikoo />
      </div>
    </div>
  );
}
