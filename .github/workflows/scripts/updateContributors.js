import { execSync } from 'node:child_process';
import * as fs from 'node:fs';

// Function to map commit type to contribution type
function mapCommitTypeToContributionType(commitType) {
  const typeMap = {
    feat: 'code',
    style: 'code',
    refactor: 'code',
    perf: 'code',
    revert: 'code',
    types: 'code',
    wip: 'code',
    chore: 'tool',
    build: 'tool',
    ci: 'tool',
    test: 'test',
    fix: 'bug',
    docs: 'doc',
  };
  return typeMap[commitType] || 'code';
}

function updateContributors(username, type) {
  try {
    const content = fs.readFileSync('.all-contributorsrc', 'utf-8');
    const contributors = JSON.parse(content);

    // Check if the user already exists
    const exists = contributors.contributors.some(contributor => contributor.login === username);
    if (!exists) {
      console.log(`Adding new contributor: ${username}`);
      const command = `npx all-contributors-cli add ${username} ${type}`;
      console.log(`Running command: ${command}`);
      execSync(command, { stdio: 'inherit' });
      console.log('Contributor added successfully.');

      // Generate the contributors list after adding a new contributor
      console.log('Generating contributors list...');
      const generateCommand = 'npx all-contributors-cli generate';
      console.log(`Running command: ${generateCommand}`);
      execSync(generateCommand, { stdio: 'inherit' });
      console.log('Contributors list updated.');

      // 阅读更新后的 README.md 内容
      const readmeContent = fs.readFileSync('README.md', 'utf-8');

      // 提取贡献者徽章部分
      const badgeStartMarker = '<!-- ALL-CONTRIBUTORS-BADGE:START -->';
      const badgeEndMarker = '<!-- ALL-CONTRIBUTORS-BADGE:END -->';
      const badgeStartIndex = readmeContent.indexOf(badgeStartMarker);
      const badgeEndIndex = readmeContent.indexOf(badgeEndMarker) + badgeEndMarker.length;
      const contributorsBadgeSection = readmeContent.substring(badgeStartIndex, badgeEndIndex);

      // 提取撰稿人名单部分
      const listStartMarker = '<!-- ALL-CONTRIBUTORS-LIST:START -->';
      const listEndMarker = '<!-- ALL-CONTRIBUTORS-LIST:END -->';
      const listStartIndex = readmeContent.indexOf(listStartMarker);
      const listEndIndex = readmeContent.indexOf(listEndMarker) + listEndMarker.length;
      const contributorsListSection = readmeContent.substring(listStartIndex, listEndIndex);

      // 阅读 README.zh-CN.md 内容
      let readmeZhCnContent = fs.readFileSync('README.zh-CN.md', 'utf-8');

      // 删除 README.zh-CN.md 中现有的贡献者徽章部分
      const existingBadgeStartIndex = readmeZhCnContent.indexOf(badgeStartMarker);
      const existingBadgeEndIndex = readmeZhCnContent.indexOf(badgeEndMarker) + badgeEndMarker.length;
      if (existingBadgeStartIndex !== -1 && existingBadgeEndIndex !== -1) {
        readmeZhCnContent = readmeZhCnContent.slice(0, existingBadgeStartIndex) + readmeZhCnContent.slice(existingBadgeEndIndex);
      }

      // 在 README.zh-CN.md 中插入翻译好的贡献者徽章部分
      readmeZhCnContent = readmeZhCnContent.slice(0, existingBadgeStartIndex) + contributorsBadgeSection + readmeZhCnContent.slice(existingBadgeStartIndex);

      // 删除 README.zh-CN.md 中现有的贡献者列表部分
      const existingListStartIndex = readmeZhCnContent.indexOf(listStartMarker);
      const existingListEndIndex = readmeZhCnContent.indexOf(listEndMarker) + listEndMarker.length;
      if (existingListStartIndex !== -1 && existingListEndIndex !== -1) {
        readmeZhCnContent = readmeZhCnContent.slice(0, existingListStartIndex) + readmeZhCnContent.slice(existingListEndIndex);
      }

      // 在 README.zh-CN.md 中插入已翻译的贡献者名单部分
      readmeZhCnContent = readmeZhCnContent.slice(0, existingListStartIndex) + contributorsListSection + readmeZhCnContent.slice(existingListStartIndex);

      // 将更新内容写入 README.zh-CN.md
      fs.writeFileSync('README.zh-CN.md', readmeZhCnContent);
      
      
    } else {
      console.log('Contributor already exists, skipping...');
    }
  } catch (error) {
    console.error('Error updating contributors:', error.message);
    process.exit(1);
  }
}

function main() {
  const username = process.env.GITHUB_ACTOR;
  if (!username) {
    console.error('GITHUB_ACTOR is not defined.');
    process.exit(1);
  }

  try {
    const lastCommitMessage = execSync('git log -1 --pretty=%B').toString().trim();
    const commitType = lastCommitMessage.split(' ')[0];
    const contributionType = mapCommitTypeToContributionType(commitType);

    updateContributors(username, contributionType);
    // 检查文件状态
    const checkFileStatus = (filePath) => {
      const status = execSync(`git status --porcelain ${filePath}`).toString().trim();
      console.log(`${filePath} status: ${status}`);
      return status;
    };
  
    // 检查 git status 以确认有变更
    const changes = execSync('git status --porcelain').toString().trim();
    console.log('Git changes:', changes);
    if (changes) {
      console.log('检测到更改，继续提交.');
      try {
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "docs: update contributors list"', { stdio: 'inherit' });
        execSync('git push origin main', { stdio: 'inherit' });
      } catch (error) {
        console.error('Failed to commit and push changes:', error.message);
        process.exit(1);
      }
    } else {
      console.log('未检测到更改，跳过提交.');
    }
  } catch (error) {
    console.error('Error processing commit:', error.message);
    process.exit(1);
  }
}

main();
