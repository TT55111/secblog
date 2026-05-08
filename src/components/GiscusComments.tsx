import Giscus from '@giscus/react';

interface GiscusCommentsProps {
  term?: string;
}

export default function GiscusComments({ term }: GiscusCommentsProps) {
  const repo = import.meta.env.GISCUS_REPO as string | undefined;
  const repoId = import.meta.env.GISCUS_REPO_ID as string | undefined;
  const category = import.meta.env.GISCUS_CATEGORY as string | undefined;
  const categoryId = import.meta.env.GISCUS_CATEGORY_ID as string | undefined;

  if (!repo || !repoId || !categoryId) {
    return (
      <div style={{
        background: '#0a140a',
        border: '1px dashed #00ff4133',
        borderRadius: '4px',
        padding: '40px',
        textAlign: 'center',
        fontFamily: "'Fira Code', monospace",
        fontSize: '12px',
        color: '#4a7a4a',
      }}>
        <p>💬 评论系统配置中</p>
        <p style={{ color: '#00ff41', marginTop: '8px' }}>基于 GitHub Discussions · 无需服务器</p>
      </div>
    );
  }

  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category || 'Comments'}
      categoryId={categoryId}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="zh-CN"
      loading="lazy"
      term={term}
    />
  );
}
