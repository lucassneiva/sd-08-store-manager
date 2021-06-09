module.exports = ({ protocol, hostname, port, username,
  password, pathname, search, hash }) => {
  const host = username ? `@${hostname}` : hostname;
  const pwd = password ? `:${password}` : '';
  const portNumber = port ? `:${port}` : '';
  const searchStr = search ? `?${search}` : '';
  const hashStr = hash ? `#${hash}` : '';

  return `${protocol}://${username}${pwd}${host}${portNumber}/${pathname}${hashStr}${searchStr}`;
};
