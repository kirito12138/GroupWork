
import os
def countFileLines(filename):
    count=0;
    handle = open(filename,'rb')
    for line in handle:
        count+=1;
    return count;
 
def listdir(dir,lines):
    files = os.listdir(dir)  #列出目录下的所有文件和目录
    print(files)
    for file in files:
        filepath = os.path.join(dir,file)
        if os.path.isdir(filepath):  #如果filepath是目录，递归遍历子目录
           listdir(filepath,lines)
        elif os.path:   #如果filepath是文件，直接统计行数
            lines.append(countFileLines(filepath))

#                print(file + ':'+str(countFileLines(filepath)))
lines = []

dir = 'F:\\学习\\大三下\\软件工程\\大作业\\GroupWork\\code\\pages'
listdir(dir,lines)
print('total lines='+str(sum(lines)))
