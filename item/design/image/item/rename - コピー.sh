if [ $# -lt 3 ]
then
	echo "変更前の文字列, 変更後の文字列, 変更したいファイル名を入力して下さい."
	exit 1
fi

args=$*
extra_args="$1 $2"
files=${args#$extra_args}

for f in $files
do
	mv $f ${f/$1/$2}
done
            