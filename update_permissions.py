import os

for root, dirs, files in os.walk("web"):
    for dirname in dirs: # 771
        fp = os.path.join(root, dirname)
        if "WEB-INF" in fp:
            continue
        print("chmod 771 " + fp)
        os.system("chmod 771 " + fp)
    for filename in files: # 664
        fp = os.path.join(root, filename)
        if "WEB-INF" in fp:
            continue
        print("chmod 664 " + fp)
        os.system("chmod 664 " + fp)
