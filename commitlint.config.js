export default {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    'body-leading-blank': [2, 'always'], // 确保提交消息正文之前有一行空白行
    'type-empty': [2, 'never'], // 不允许提交消息的 type 类型为空
    'subject-case': [0], // subject 大小写不做校验
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚commit
        'build', // 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)',
        'ci', // 修改CI配置、脚本
        'types', // 类型定义文件修改
        'wip', // 开发中
      ],
    ],
  },
};
