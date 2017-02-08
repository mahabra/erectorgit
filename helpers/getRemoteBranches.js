import { exec, echo } from 'erector';

const getBranchExpr = /^[\*]?[\s]+([^\n]+)/mi;
const getBranchExprNoAliasExpr = /^remotes\/[^\/]+\/(.+)$/mi;
const noRefExpr = /\->+/;

export default function* getGitRemoteBranches(cwd) {
  const branches = yield exec('git branch -a', cwd ? {
    cwd,
  } : undefined);
  yield branches.split("\n")
  .map((line) => {
    const parse = getBranchExpr.exec(line);
    return parse && parse[1].trim();
  })
  .filter(branch => branch)
  .map((fullBranchName) => {
    const pureBranchName = getBranchExprNoAliasExpr.exec(fullBranchName);
    return pureBranchName && pureBranchName[1];
  })
  .filter(name => name && !noRefExpr.test(name));
}
