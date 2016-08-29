require 'tmpdir'
require 'fileutils'

branch = ENV['BRANCH'] || ''
git_repository = 'git@github.com:renuo/renuo-upload-demo.git'
git_user_name = ENV['GIT_USER_NAME'] || ''
git_user_email = ENV['GIT_USER_EMAIL'] || ''
cname = ''

abort 'BRANCH not set' if branch.empty?

Dir.mktmpdir do |tmp|
  FileUtils.cp_r 'dist/.', tmp

  pwd = Dir.pwd
  Dir.chdir tmp

  File.write('CNAME', cname) unless cname.empty?

  system "git init"
  system "git config user.email '#{git_user_email}'" unless git_user_email.empty?
  system "git config user.name '#{git_user_name}'" unless git_user_name.empty?
  system "git add ."
  system "git commit -m 'Deployed at #{Time.now.utc}'"
  system "git remote add origin #{git_repository}"
  system "git push origin master:#{branch} --force"

  Dir.chdir pwd
end
