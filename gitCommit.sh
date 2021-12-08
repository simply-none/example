git status

commits='
JavaScript对象相关内容
'

echo $commits

read -p "输入y继续，否则退出: " flag

y="y"

if [[ "$flag" == "$y" ]]
then
  git add --all
  git commit -m "$commits"
  git push origin main
  echo -e '++++++++++++++++++++++++++++++++\n\n\n\n\n\n'
  git status
  echo -e '\n\n\n\n\n\n++++++++++++++++++++++++++++++++'
else
  echo -e '\n\n\n\n\n\n没有做任何操作\n\n\n\n\n\n'
fi