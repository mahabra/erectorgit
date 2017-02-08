import { exec } from 'erector';

export default function* getGitRoot(cwd) {
  const root = yield exec('git rev-parse --show-toplevel', cwd ? {
    cwd,
  } : undefined);
  yield root.trim();
}
