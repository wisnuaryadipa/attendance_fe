module.exports = {
    apps : [{
      name   : "api-attendance",
      script : "./src/app.ts",
      interpreter: 'craco',
      interpreter_args: '-r tsconfig-paths/register start',
      merge_logs: true,
      max_restarts: 20,
    }]
  }