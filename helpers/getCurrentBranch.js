import { exec } from 'erector';

const getBranchExpr = /^\* ([^\n]+)/mi;

export default function* getBranchHoc(cwd) {
  const branches = yield exec('git branch', cwd ? {
    cwd,
  } : undefined);
  const branch = getBranchExpr.exec(branches);
  if (!branch) {
    throw new Error('No branch found');
  } else {
    yield branch[1];
  }
}
