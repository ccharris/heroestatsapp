module.exports = {
  apps: [{
    name: 'heroestats',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-13-58-213-175.us-east-2.compute.amazonaws.com',
      key: '~/desktop/HotsReplayInstance.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ccharris/heroestatsapp.git',
      path: '/home/ec2-user/heroestats',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}

