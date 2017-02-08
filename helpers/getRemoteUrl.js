import { exec } from 'erector';

const getAddrFromOriginExpr = /^origin[\s]+([^ ]*)[\s]+\(fetch\)$/mi;

export default function* getGitRemoteUrl(cwd) {
  const origin = yield exec('git remote -v', cwd ? {
    cwd,
  } : undefined);
  const purl = getAddrFromOriginExpr.exec(origin.trim());
  if (!purl) {
    throw new Error("There is no remote url");
  }
  yield purl[1].trim();
}
