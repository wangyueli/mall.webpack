
local_project_name=mall.webpack
project_name=yct.mall
project_dir=..
tmp_dir=./tmp

echo '准备升级'${project_name}${project_dir}/${local_project_name}
if [ ! -e "${project_dir}/${local_project_name}" ]; then
        echo '升级包未找到，停止升级！'
        exit
fi

echo '进入工程目录'
cd ${project_dir}/${local_project_name}
echo '编译工程'
npm run build
if [ ! -e "${project_dir}/${local_project_name}/dist" ]; then
        echo '临时目录存在异常，停止升级！'
        exit
fi

echo '准备临时目录'
rm -rf ${tmp_dir}
mkdir ${tmp_dir}
if [ ! -e "${tmp_dir}" ]; then
        echo '临时目录存在异常，停止升级！'
        exit
fi
mkdir ${tmp_dir}/${project_name}
cp -rf ./dist/* ${tmp_dir}/${project_name}/
cd -
echo '生成升级包'
cd ${tmp_dir} && zip -r ./${project_name}.zip ./${project_name}/ > /dev/null 2>&1 && cd -

echo '上传'${project_name}'.zip升级包到服务器'
scp -r ${tmp_dir}/${project_name}.zip yct@yct01:~/yct-mall-test

echo '在服务器1上执行升级脚本'
ssh yct@yct01 'cd ~/yct-mall-test && sh ./updatemall.sh'

echo '删除临时目录'
rm -rf ${tmp_dir}

echo '升级完成'

