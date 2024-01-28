const formatHyperlinks = (input: string) => {
  const pattern = /\[url=([^\]]+)\]([^\[]+)\[\/url\]/g;
  const replacement = (match: string, url: string, title: string) => {
    const absoluteUrl = url.startsWith('/') ? `https://vndb.org${url}` : url;
    return `[${title}](${absoluteUrl})`;
  };

  return input.replace(pattern, replacement);
};

export default formatHyperlinks;
