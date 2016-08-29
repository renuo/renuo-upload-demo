require 'tmpdir'
require 'fileutils'

branch = ENV['BRANCH']
git_repository = 'git@github.com:renuo/renuo-upload-demo.git'
cname = ''

abort 'BRANCH not set' if branch.nil? || branch.empty?

Dir.mktmpdir do |tmp|
  FileUtils.cp_r 'dist/.', tmp

  pwd = Dir.pwd
  Dir.chdir tmp

  File.write('CNAME', cname) unless cname.empty?

  system "git init"
  system "git add ."
  system "git commit -m 'Deployed at #{Time.now.utc}'"
  system "git remote add origin #{git_repository}"
  system "git push origin master:#{branch} --force"

  Dir.chdir pwd
end
