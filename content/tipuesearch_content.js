var tipuesearch = {"pages": [{'title': '內建資料', 'text': 'CMSimfly ( https://github.com/chiamingyen/cmsimfly)  是一套簡單的網際內容管理系統, 採用 Flask 網際框架, 以 Beautifulsoup 解讀分頁內容. \n \n', 'tags': '', 'url': '內建資料.html'}, {'title': '目錄結構', 'text': 'CMSimfly 的動態系統採用 Python3 + Flask 建構, 並且利用 Beatifulsoup 解讀位於 contig 目錄中的 content.htm 超文件檔案. \n content.htm 檔案可以透過動態系統中的 generate_pages 功能, 將超文件轉為位於 content 目錄中的個別頁面檔案. \n 動態系統與靜態系統則共用 downloads, images, static 等目錄, 其中 downloads 目錄存放在動態系統上傳的文件檔, 而 images 目錄則存放動態系統所上傳的影像檔案, 包括 jpg, png 與 gif 等格式圖檔. \n static 目錄則存放在動態與靜態系統所需要的 Javascript 或 Brython 程式檔. \n', 'tags': '', 'url': '目錄結構.html'}, {'title': '頁面編輯', 'text': 'CMSimfly 動態系統的網際編輯器採用  TinyMCE4 , 可以放入一般超文件,\xa0 納入圖檔, 嵌入影片連結, 並且加入帶有行數的原始碼. \n 透過 File Upload 功能, 可以一次上傳多個檔案,\xa0 存入 downloads 目錄中儲存, 之後各頁面可以引入對應連結. \n 而圖檔的上傳與引用與一般檔案類似, 但上傳後存入 images 目錄中. \n', 'tags': '', 'url': '頁面編輯.html'}, {'title': '插入程式碼', 'text': 'CMSimfly 目前使用 Syntaxhighlighter 3.0.83: \n \xa0 http://alexgorbatchev.com/SyntaxHighlighter/ \xa0 \n 進行頁面中的程式碼高亮顯示. \n Java 程式碼 \n import java.util.Scanner;\n\npublic class Life {\n    public static void show(boolean[][] grid){\n        String s = "";\n        for(boolean[] row : grid){\n            for(boolean val : row)\n                if(val)\n                    s += "*";\n                else\n                    s += ".";\n            s += "\\n";\n        }\n        System.out.println(s);\n    }\n    \n    public static boolean[][] gen(){\n        boolean[][] grid = new boolean[10][10];\n        for(int r = 0; r < 10; r++)\n            for(int c = 0; c < 10; c++)\n                if( Math.random() > 0.7 )\n                    grid[r][c] = true;\n        return grid;\n    }\n    \n    public static void main(String[] args){\n        boolean[][] world = gen();\n        show(world);\n        System.out.println();\n        world = nextGen(world);\n        show(world);\n        Scanner s = new Scanner(System.in);\n        while(s.nextLine().length() == 0){\n            System.out.println();\n            world = nextGen(world);\n            show(world);\n            \n        }\n    }\n    \n    public static boolean[][] nextGen(boolean[][] world){\n        boolean[][] newWorld \n            = new boolean[world.length][world[0].length];\n        int num;\n        for(int r = 0; r < world.length; r++){\n            for(int c = 0; c < world[0].length; c++){\n                num = numNeighbors(world, r, c);\n                if( occupiedNext(num, world[r][c]) )\n                    newWorld[r][c] = true;\n            }\n        }\n        return newWorld;\n    }\n    \n    public static boolean occupiedNext(int numNeighbors, boolean occupied){\n        if( occupied && (numNeighbors == 2 || numNeighbors == 3))\n            return true;\n        else if (!occupied && numNeighbors == 3)\n            return true;\n        else\n            return false;\n    }\n\n    private static int numNeighbors(boolean[][] world, int row, int col) {\n        int num = world[row][col] ? -1 : 0;\n        for(int r = row - 1; r <= row + 1; r++)\n            for(int c = col - 1; c <= col + 1; c++)\n                if( inbounds(world, r, c) && world[r][c] )\n                    num++;\n\n        return num;\n    }\n\n    private static boolean inbounds(boolean[][] world, int r, int c) {\n        return r >= 0 && r < world.length && c >= 0 &&\n        c < world[0].length;\n    }\n\n} \n \n Python 程式碼 \n def parse_content():\n    """use bs4 and re module functions to parse content.htm"""\n    #from pybean import Store, SQLiteWriter\n    # if no content.db, create database file with cms table\n    \'\'\'\n    if not os.path.isfile(config_dir+"content.db"):\n        library = Store(SQLiteWriter(config_dir+"content.db", frozen=False))\n        cms = library.new("cms")\n        cms.follow = 0\n        cms.title = "head 1"\n        cms.content = "content 1"\n        cms.memo = "first memo"\n        library.save(cms)\n        library.commit()\n    \'\'\'\n    # if no content.htm, generate a head 1 and content 1 file\n    if not os.path.isfile(config_dir+"content.htm"):\n        # create content.htm if there is no content.htm\n        File = open(config_dir + "content.htm", "w", encoding="utf-8")\n        File.write("<h1>head 1</h1>content 1")\n        File.close()\n    subject = file_get_contents(config_dir+"content.htm")\n    # deal with content without content\n    if subject == "":\n        # create content.htm if there is no content.htm\n        File = open(config_dir + "content.htm", "w", encoding="utf-8")\n        File.write("<h1>head 1</h1>content 1")\n        File.close()\n        subject = "<h1>head 1</h1>content 1"\n    # initialize the return lists\n    head_list = []\n    level_list = []\n    page_list = []\n    # make the soup out of the html content\n    soup = bs4.BeautifulSoup(subject, \'html.parser\')\n    # 嘗試解讀各種情況下的標題\n    soup = _remove_h123_attrs(soup)\n    # 改寫 content.htm 後重新取 subject\n    with open(config_dir + "content.htm", "wb") as f:\n        f.write(soup.encode("utf-8"))\n    subject = file_get_contents(config_dir+"content.htm")\n    # get all h1, h2, h3 tags into list\n    htag= soup.find_all([\'h1\', \'h2\', \'h3\'])\n    n = len(htag)\n    # get the page content to split subject using each h tag\n    temp_data = subject.split(str(htag[0]))\n    if len(temp_data) > 2:\n        subject = str(htag[0]).join(temp_data[1:])\n    else:\n        subject = temp_data[1]\n    if n >1:\n            # i from 1 to i-1\n            for i in range(1, len(htag)):\n                head_list.append(htag[i-1].text.strip())\n                # use name attribute of h* tag to get h1, h2 or h3\n                # the number of h1, h2 or h3 is the level of page menu\n                level_list.append(htag[i-1].name[1])\n                temp_data = subject.split(str(htag[i]))\n                if len(temp_data) > 2:\n                    subject = str(htag[i]).join(temp_data[1:])\n                else:\n                    subject = temp_data[1]\n                # cut the other page content out of htag from 1 to i-1\n                cut = temp_data[0]\n                # add the page content\n                page_list.append(cut)\n    # last i\n    # add the last page title\n    head_list.append(htag[n-1].text.strip())\n    # add the last level\n    level_list.append(htag[n-1].name[1])\n    temp_data = subject.split(str(htag[n-1]))\n    # the last subject\n    subject = temp_data[0]\n    # cut the last page content out\n    cut = temp_data[0]\n    # the last page content\n    page_list.append(cut)\n    return head_list, level_list, page_list\n\n \n \n C或C++程式碼 \n 請注意, 目前 CMSimfly 標題內文無法解讀 "/" 符號, 因此若本頁面的標題為\xa0 "C/C++程式碼", 則無法進行分頁. \n /* Runge Kutta for a set of first order differential equations */\n \n#include <stdio.h>\n#include <math.h>\n \n#define N 2 /* number of first order equations */\n#define dist 0.1 /* stepsize in t*/\n#define MAX 30.0 /* max for t */\n \nFILE *output; /* internal filename */\nFILE *output1; /* internal filename */\n// 利用 pipe 呼叫 gnuplot 繪圖\nFILE *pipe;\n \nvoid runge4(double x, double y[], double step); /* Runge-Kutta function */\ndouble f(double x, double y[], int i); /* function for derivatives */\n \nvoid main(){\n \n  double t, y[N];\n  int j;\n \n  output=fopen("osc.dat", "w"); /* external filename */\n  output1=fopen("osc1.dat", "w"); /* external filename */\n \n  y[0]=1.0; /* initial position */\n  y[1]=0.0; /* initial velocity */\n \n  //fprintf(output, "0\\t%f\\n", y[0]);\n \n  for (j=1; j*dist<=MAX ;j++) /* time loop */{\n \n    t=j*dist;\n    runge4(t, y, dist);\n    fprintf(output, "%f\\t%f\\n", t, y[0]);\n    fprintf(output1, "%f\\t%f\\n", t, y[1]);\n  }\n \n  fclose(output);\n  fclose(output1);\n \n  pipe = popen("gnuplot -persist","w");\n  //fprintf(pipe,"set term png enhanced font \\"v:/fireflysung.ttf\\" 18 \\n");\n  fprintf(pipe,"set term png enhanced font \\"y:/wqy-microhei.ttc\\" 18 \\n");\n  //fprintf(pipe,"set yrange [68:70]\\n");\n  fprintf(pipe,"set output \\"test.png\\"\\n");\n  fprintf(pipe, "plot \\"osc.dat\\" title \\"位移\\" with lines, \\"osc1.dat\\" title \\"速度\\" with lines\\n");\n  fprintf(pipe,"quit\\n");\n\n  fprintf(pipe,"quit\\n");\n  pclose(pipe);\n}\n \nvoid runge4(double x, double y[], double step){\n \n  double h=step/2.0, /* the midpoint */\n  t1[N], t2[N], t3[N], /* temporary storage arrays */\n  k1[N], k2[N], k3[N],k4[N]; /* for Runge-Kutta */\n  int i;\n \n  for (i=0;i<N;i++){\n \n    t1[i]=y[i]+0.5*(k1[i]=step*f(x,y,i));\n  }\n \n  for (i=0;i<N;i++){\n \n    t2[i]=y[i]+0.5*(k2[i]=step*f(x+h, t1, i));\n  }\n \n  for (i=0;i<N;i++){\n \n    t3[i]=y[i]+ (k3[i]=step*f(x+h, t2, i));\n  }\n \n  for (i=0;i<N;i++){\n \n    k4[i]= step*f(x+step, t3, i);\n  }\n \n  for (i=0;i<N;i++){\n \n    y[i]+=(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6.0;\n  }\n}\n \ndouble f(double x, double y[], int i){\n \n  if (i==0)\n    x=y[1]; /* derivative of first equation */\n  if (i==1)\n    x=-y[0]-0.5*y[1];\n  return x;\n} \n \n Lua 程式碼 \n -- 導入 js 模組\njs = require("js")\n-- 取得 window\nwindow = js.global\n-- 猜小於或等於 n 的整數\nbig = 100\n-- 計算猜測次數, 配合 while 至少會猜一次\nnum = 1\n-- 利用 window:prompt 方法回應取得使用者所猜的整數\nguess = window:prompt("請猜一個介於 1 到 "..big.." 的整數")\n-- 利用數學模組的 random 函數以亂數產生答案\nanswer = math.random(big)\noutput = ""\n-- 若沒猜對, 一直猜到對為止\nwhile answer ~= tonumber(guess) do\n    if answer > tonumber(guess) then\n        output = "猜第 "..num.." 次, guess="..guess..", answer="..answer.." - too small"\n        print(output)\n    else\n        output = "猜第 "..num.." 次, guess="..guess..", answer="..answer.." - too big"\n        print(output)\n    end \n    guess = window:prompt(output..", 請猜一個介於 1 到 "..big.." 的整數")\n    num = num + 1\nend\nprint("總共猜了 "..num.." 次, answer=guess="..answer.." - correct")\n     \n \n Javascript 程式碼 \n STLViewer = function(stlpath, plotarea) {\n\n\tvar mycanvas = document.getElementById(plotarea);\n\tvar viewer = new JSC3D.Viewer(mycanvas)\n\tvar theScene = new JSC3D.Scene;\n\t////Initialize with a default file:\n\t//var stlpath = "../../../assets/2013-10-23/stl/box.STL"\n\t//var stlpath = "../../../assets/2013-10-23/stl/taj.stl"\n\tviewer.setParameter(\'SceneUrl\', stlpath);\n    viewer.setParameter(\'InitRotationX\', 20);\n\tviewer.setParameter(\'InitRotationY\', 20);\n\tviewer.setParameter(\'InitRotationZ\', 0);\n\tviewer.setParameter(\'ModelColor\', \'#CAA618\');\n\tviewer.setParameter(\'BackgroundColor1\', \'#FFFFFF\');\n\tviewer.setParameter(\'BackgroundColor2\', \'#383840\');\n\tviewer.init();\n\tviewer.update();\n\t////init done\n\tvar canvas_drop = document.getElementById(\'canvas-drop\')\n\t/*var dropzone = document.getElementById(\'dropzone\')\n\tdropzone.addEventListener(\'dragover\', handleDragOver, false);\n\tdropzone.addEventListener(\'drop\', handleFileSelect, false); */\n\tcanvas_drop.addEventListener(\'dragover\', handleDragOver, false);\n\tcanvas_drop.addEventListener(\'drop\', handleFileSelect, false);\n\n////Drag and drop logic:\n\tfunction handleFileSelect(evt) {\n\t    evt.stopPropagation();\n\t    evt.preventDefault();\n\t    var files = evt.dataTransfer.files;\n\t    console.log(evt)\n\t    console.log(files)\n\t    preview_stl(files[0])\n\t  }\n\n\t  function handleDragOver(evt) {\n\t    evt.stopPropagation();\n\t    evt.preventDefault();\n\t    evt.dataTransfer.dropEffect = \'copy\';\n\t  }\n\n////jsc3d logic\n\tvar handle_file_select = function(e) {\n\t\te.stopPropagation()\n\t\te.preventDefault()\n\t\tvar f = e.target.files[0]\n\t\tpreview_stl(f)\n\t}\n\n\tfunction preview_stl(f) {\n\t\tvar reader = new FileReader()\n\t\tvar ext = f.name.split(".")[1]\n\n\t\tfunction setup_viewer() {\n\t\t\tviewer.setParameter(\'InitRotationX\', 20);\n\t\t\tviewer.setParameter(\'InitRotationY\', 20);\n\t\t\tviewer.setParameter(\'InitRotationZ\', 0);\n\t\t\tviewer.setParameter(\'ModelColor\', \'#CAA618\');\n\t\t\tviewer.setParameter(\'BackgroundColor1\', \'#FFFFFF\');\n\t\t\tviewer.setParameter(\'BackgroundColor2\', \'#383840\');\n\t\t\tviewer.setParameter(\'RenderMode\', "flat");\n\t\t}\n\t\tsetup_viewer()\n\n\t\treader.onload = (function(file) {\n\t\t\treturn function(e) {\n\t\t\t\ttheScene = new JSC3D.Scene\n\t\t    \tstl_loader = new JSC3D.StlLoader()\n\t\t    \tstl_loader.parseStl(theScene, e.target.result)\n\t\t      \t//viewer.init()\n\t\t      \tviewer.replaceScene(theScene)\n\t\t      \tviewer.update()\n\t\t      \tconsole.log("file reader onload")\n\t\t\t}\n\t\t})(f)\n\n\t\tif (ext.toLowerCase() != "stl") {\n\t\t\talert("That doesn\'t appear to be an STL file.");\n\t\t} else {\n\t\t\treader.readAsBinaryString(f)\n\t\t}\n\t}\n}\n \n \n Html 原始碼 \n <html>\n   <head>\n      <meta http-equiv="content-type" content="text/html;charset=utf-8">\n      <title>CMSimfly</title>\n      <link rel="stylesheet" type="text/css" href="/static/cmsimply.css">\n   </head>\n   <body>\n      <div class=\'container\'>\n      <nav>\n         <ul id=\'css3menu1\' class=\'topmenu\'>\n            <li><a href=\'/get_page/簡介\'>簡介</a>\n            <li><a href=\'/get_page/目錄結構\'>目錄結構</a>\n            <li>\n               <a href=\'/get_page/頁面編輯\'>頁面編輯</a>\n               <ul>\n                  <li>\n                     <a href=\'/get_page/插入程式碼\'>插入程式碼</a>\n                     <ul>\n                        <li><a href=\'/get_page/Java 程式碼\'>Java 程式碼</a>\n                        <li><a href=\'/get_page/Python 程式碼\'>Python 程式碼</a>\n                        <li><a href=\'/get_page/C或C++程式碼\'>C或C++程式碼</a>\n                        <li><a href=\'/get_page/Lua 程式碼\'>Lua 程式碼</a>\n                        <li><a href=\'/get_page/Javascript 程式碼\'>Javascript 程式碼</a>\n                        <li><a href=\'/get_page/Html 原始碼\'>Html 原始碼</a></li>\n                        </li>\n                     </ul>\n               </ul>\n            <li><a href=\'/get_page/網際簡報\'>網際簡報</a>\n            <li><a href=\'/get_page/網誌編輯\'>網誌編輯</a>\n            <li><a href=\'/get_page/已知錯誤\'>已知錯誤</a></li>\n         </ul>\n      </nav>\n      <section>\n         <form method=\'post\' action=\'/ssavePage\'>\n         <textarea class=\'simply-editor\' name=\'page_content\' cols=\'50\' rows=\'15\'><h3>Html 原始碼</h3></textarea>\n         <input type=\'hidden\' name=\'page_order\' value=\'9\'>\n         <input type=\'submit\' value=\'save\'>\n         <input type=button onClick="location.href=\'/get_page/Html 原始碼\'" value=\'viewpage\'>\n         </form>\n      </section>\n   </body>\n</html>\nCOPY TO CLIPBOARD\t \n \n', 'tags': '', 'url': '插入程式碼.html'}, {'title': '網際簡報', 'text': 'CMSimfly 中採用  Reveal.js  作為網際簡報, 其中的維護檔案位於 config/reveal.js, 而對應的簡報檔案則位於 reveal 目錄中. \n', 'tags': '', 'url': '網際簡報.html'}, {'title': '網誌編輯', 'text': 'CMSimfly 彩用  Pelican blog  系統, 編輯檔案位於 config/pelican.leo, 對應的 \n \xa0Markdown 原始檔案位於 markdown 目錄中, 而經 Pelican 轉換出的網誌超文件檔案則位於 blog 目錄中. \n 其餘在網誌文章中所需要的 Javascript 或 Brython 程式檔案, 則與 CMSimfly 及 Reveal.js 共用, 位於 static 目錄下. \n 上傳檔案與圖檔的引用則與 CMSimfly 架構相同. \n', 'tags': '', 'url': '網誌編輯.html'}, {'title': '已知錯誤', 'text': '全部頁面會因無法正確解讀而誤刪 \n 在特定情況下, 系統會誤刪 config/content.htm 檔案, 目前在單頁或全部頁面編輯存檔之前, 或將上一版本的 content.htm 存入 content_back.htm, 若 content.htm 內容被程式誤刪, 可以利用備份檔案複製回原始內容後, 再進行後續處理. \n \n 解決：當上一版的 \xa0content.htm 被存在 content_back.htm 且內容的 htm未被刪除時（\xa0 content.htm \xa0 裡內容只剩 head1） ，可手動將\xa0 content.htm \xa0刪除或更名（切勿與\xa0content_back.htm 同名以免搞混或被覆蓋掉）再把\xa0content_back.htm 更名為\xa0content.htm\xa0，這樣就可以讀到上版本\xa0content.htm\xa0 \n \n 頁面標題不支援特殊符號 \n 各頁面標題目前不支援特殊符號, 例如: "/", "?" 等, 若已經發生程式無法解讀頁面的情況, 只能從編輯 config/content.htm 下手, 若系統位於遠端, 則後續必須要再設法提供一個額外的編輯 config/content.htm 檔案的網際連結功能. \n Video 引用不支援內部引用 \n tinymce 中插入 video 的小視窗, 要移除引用的圖像與連結, 因為一般建議不要在內容中存入 .mp4 的影片資料, 而只接受引入影片 URL 連結. \n', 'tags': '', 'url': '已知錯誤.html'}, {'title': '網路連線設定', 'text': '了解機械設計系電腦輔助設計室電腦的網路設定, 其中包括 IPv4 網路與 IPv6 網路設定. \n 首先開啟網路連線 \n \n 選擇乙太網路2並右鍵內容 \n \n 勾選IPV6並取消IPV4，點選進入IPV6 \n \n 在DNS司服器輸入[2001:b000:168::1] \n \n 進入chrome設定，進階選擇Proxy \n \n 點選LAN設定 \n \n 位置輸入140.130.17.42連接 埠 輸入3128 \n \n \n', 'tags': '', 'url': '網路連線設定.html'}, {'title': '配置可攜程式環境', 'text': '取得 Windows 10 64 位元環境下的可攜程式環境 ( 下載\xa0 2019_cdb_w5.7z ), 下載後解開目錄, 放入 USB3.0 規格以上的隨身碟或隨身硬碟. \n 開啟start.bat即可以開啟隨身系統，以開啟stop.bat結束隨身系統 \n \n 基本DOS(Disk Operating System)指令: \n Y:\xa0 即切換至Y槽 \n cd ___\xa0 \xa0 切換至某目錄 \n cd ..\xa0 回至上一層目錄 \n cd / 回至目前所在槽 \n dir\xa0 \xa0列出目前所在目錄的內容 \n mkdir\xa0 在所在位置建立目錄 \n cls\xa0\xa0 清除目前的命令列顯示的內容 \n', 'tags': '', 'url': '配置可攜程式環境.html'}, {'title': '倉儲改版', 'text': '', 'tags': '', 'url': '倉儲改版.html'}, {'title': '建立 Git 倉儲', 'text': '建立 Git 倉儲, 共分為兩類 \n (1)\xa0 直接在 Github 網際介面下建立倉儲時, 要求建立 README.md 檔案, 之後可以直接在近端, 以 git clone 加上倉儲連線 URL, 將倉儲克隆一份到近端, 並以最新版本作為工作目錄, 使用者改版後, 可以直接透過 git add, commit 與 push 對遠端倉儲改版 \n \n (2)\xa0\xa0在 Github 網際介面下建立倉儲時, 不要建立任何檔案, 而是在近端自行利用 git 指令建立倉儲架構, 新增內容後, 以 git remote add 設法在近端倉儲中納入 origin URL 後, 將近端倉儲版本新增提交推送到遠端 \n \n \n', 'tags': '', 'url': '建立 Git 倉儲.html'}, {'title': 'Git 指令', 'text': 'git add  可以用來新增一個檔案, 數個檔案, 或在之前提交後所新增的所有內容 \n git commit  可以將剛剛add新增之檔案提交至遠端，在執行前須先使用 git config 建立臨時或永久的身分註記, 因為 GIT 在展開所有改版內容時, 必須明確登錄這些變更的作者與時間. \n \xa0 (1)git commit -m "改版之標題" \n git push  可以將先前改變之內容提交至指定之遠端倉儲 \n git pull \xa0 \xa0將近端改版至遠端之最新版本 \n', 'tags': '', 'url': 'Git 指令.html'}, {'title': '建立SSH key', 'text': '\n 在所要clone的倉儲中可以用SSH的方式將倉儲clone到近端，而以SSH key的好處就是在pull或者是push的時候不需要須入帳號及密碼，它會自動搜尋位在Y:home/.ssh/裡的rsa檔並比較是否和位於git 倉儲中的SSH是否吻合。 \n', 'tags': '', 'url': '建立SSH key.html'}, {'title': '靜態CMSimfly', 'text': '自行建立靜態內容管理網站 \n 利用 CMSimfly ( https://github.com/chiamingyen/cmsimfly )內容,，將其clone至可攜系統，並利用啟動近端來編輯內容改版使遠端內容更新 \n \n', 'tags': '', 'url': '靜態CMSimfly.html'}, {'title': '編輯內容', 'text': '學習如何使用 CMSimfly，在網站中加入各種內容 \n 左方標題可以利用<h1>名稱</h1>來增加，h1.2.3.....可使目錄內含有子目錄，依此類推進而改變或新增其內容 \n \n 內容編輯: \n Insert/edit link :將文字賦予連結至網址功能 \n \n Insert/edit image :將圖片放置於內容中(需先將圖片放置於image資料夾中) \n \n Insert/edit video :將影片放置於內容中 \n \n Source code :可看到當下頁面的html程式碼 \n \n Insert/edit Code :將文字轉換為Python/C++/Java......等程式語言 \n \n', 'tags': '', 'url': '編輯內容.html'}, {'title': 'Game1', 'text': '\n \n \n  Your browser doesn\'t support the HTML5 element canvas.      Throw dice  \n Stage:   Point:   Outcome:  \n 上述程式原始碼 \n <script type="text/javascript">// <![CDATA[\nvar cwidth = 400;\n\tvar cheight = 300;\n\tvar dicex = 50;\n\tvar dicey = 50;\n\tvar dicewidth = 100;\n\tvar diceheight = 100;\n\tvar dotrad = 6;\n\tvar ctx;\n\tvar dx;\n\tvar dy;\n\tvar firstturn = true;\n\tvar point;\nfunction throwdice() {\n\tvar sum;\n\tvar ch = 1+Math.floor(Math.random()*6);\n\tsum = ch;\n\tdx = dicex;\n\tdy = dicey;\n\tdrawface(ch);\n\tdx = dicex + 150;\n\tch=1 + Math.floor(Math.random()*6);\n\tsum += ch;\n\tdrawface(ch);\n\tif (firstturn) {\n\t\tswitch(sum) {\n\t\t\tcase 7:\n\t\t\tcase 11:\n\t\t\t  document.f.outcome.value="You win!";\n\t\t\t  break;\n\t\t\tcase 2:\n\t\t\tcase 3:\n\t\t\tcase 12:\n\t\t\t  document.f.outcome.value="You lose!";\n\t\t\t  break;\n\t\t\tdefault:\n\t\t\t  point = sum;\n\t\t\t  document.f.pv.value=point;\n\t\t\t  firstturn = false;\n\t\t\t  document.f.stage.value="Need follow-up throw.";\n\t\t\t  document.f.outcome.value="   ";\n\t\t}\n\t}\n\telse {\n\t\tswitch(sum) {\n\t\tcase point:\n\t\t   document.f.outcome.value="You win!";\n\t\t   document.f.stage.value="Back to first throw.";\n\t\t   document.f.pv.value=" ";\n\t\t   firstturn = true;\n\t\t   break;\n\t\tcase 7:\n\t\t   document.f.outcome.value="You lose!";\n\t\t   document.f.stage.value="Back to first throw.";\n\t\t   document.f.pv.value=" ";\n\t\t   firstturn = true;\n\t\t}\n\t\t   \t}\n}\nfunction drawface(n) {\n  ctx = document.getElementById(\'canvas\').getContext(\'2d\');  \n  ctx.lineWidth = 5;\n  ctx.clearRect(dx,dy,dicewidth,diceheight);\n  ctx.strokeRect(dx,dy,dicewidth,diceheight)\n  var dotx;\n  var doty;\n  ctx.fillStyle = "#009966";\n\tswitch(n) {\n\t\tcase 1:\n\t\t draw1();\n\t\t break;\n\t\tcase 2:\n\t\t draw2();\n\t\t break;\n\t\tcase 3:\n\t\t draw2();\n\t\t draw1();\n\t\t break;\n\t\tcase 4:\n\t\t draw4();\n\t\t break;\n\t\tcase 5:\n\t\t draw4();\n\t\t draw1();\n\t\t break;\n\t\tcase 6:\n\t\t draw4();\n\t\t draw2mid();\n\t\t break;\n\t\t\n\t}\n}\nfunction draw1() {\n\tvar dotx;\n\tvar doty;\n\tctx.beginPath();\n\tdotx = dx + .5*dicewidth;\n\tdoty = dy + .5*diceheight;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tctx.closePath();\n\tctx.fill();\n}\nfunction draw2() {\n\tvar dotx;\n\tvar doty;\n\tctx.beginPath();\n\tdotx = dx + 3*dotrad;\n\tdoty = dy + 3*dotrad;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tdotx = dx+dicewidth-3*dotrad;\n\tdoty = dy+diceheight-3*dotrad;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tctx.closePath();\n\tctx.fill();\n}\nfunction draw4() {\n\tvar dotx;\n\tvar doty;\n\tctx.beginPath();\n\tdotx = dx + 3*dotrad;\n\tdoty = dy + 3*dotrad;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tdotx = dx+dicewidth-3*dotrad;\n\tdoty = dy+diceheight-3*dotrad;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tctx.closePath();\n\tctx.fill();\n\tctx.beginPath();\n\tdotx = dx + 3*dotrad;\n\tdoty = dy + diceheight-3*dotrad;  //no change\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tdotx = dx+dicewidth-3*dotrad;\n\tdoty = dy+ 3*dotrad;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tctx.closePath();\n\tctx.fill();\t\n}\nfunction draw2mid() {\n\tvar dotx;\n\tvar doty;\n\tctx.beginPath();\n\tdotx = dx + 3*dotrad;\n\tdoty = dy + .5*diceheight;\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tdotx = dx+dicewidth-3*dotrad;\n\tdoty = dy + .5*diceheight; //no change\n\tctx.arc(dotx,doty,dotrad,0,Math.PI*2,true);\n\tctx.closePath();\n\tctx.fill();\n}\n// ]]></script>\n<p><canvas height="300" id="canvas" width="400"> Your browser doesn\'t support the HTML5 element canvas. </canvas> <br> <button onclick="throwdice();">Throw dice </button></p>\n<form id="f" name="f">Stage: <input name="stage" type="text" value="First Throw"> Point: <input name="pv" type="text" value="   "> Outcome: <input name="outcome" type="text" value="     "></form> \n \n Try it \n \n \n \n \n <p><button onclick="myFunction()">Try it</button></p>\n<p id="demo"></p>\n<script>// <![CDATA[\nfunction myFunction() {\n  document.getElementById("demo").innerHTML = Math.floor(Math.random()*10);\n}\n// ]]></script> \n \n', 'tags': '', 'url': 'Game1.html'}, {'title': '繪圖', 'text': '解決\xa0 canvas 無法顯示 \n \n 解決方式一： \n \n \n 先在有問題的頁面下按  F12 \xa0來檢查頁面問題 \n 若有出現 \n \n \xa0 \xa0 \xa0 \xa0 \xa0 \xa0\xa0 \n \n 執行 python wsgi.py 進行動態編輯 \n 到有問題頁面進行編輯 \n 在Source code 的狀態底下將\n <script src="/get_page/static/brython.js"></script>\n<script src="/get_page/static/brython_stdlib.js"></script> \n 將/get_pageg 刪除，變成底下的路徑 \n <script src="./../static/brython.js"></script>\n<script src="./../static/brython_stdlib.js"></script> \n \n \n \n 原因：無法正確讀取到 brython \n \n 解決方式二： \n \n 先執行 \n 開啟 CMSimfly.leo \n 找到 編輯flaskapp.py \xa0底下的\xa0 savePage \xa0和  ssavePage ，找到\n  page_content = request.form[\'page_content\']\n    # when element_format : "html", need to remove the annoying comment to prevent brython exec \n 在後面加入 \n     page_content = page_content.replace(\'// <![CDATA[\', \'\')\n    page_content = page_content.replace(\'// ]]>\', \'\') \n 之後就可正常顯示\xa0 canvas \n \n \n \n 原因： <![CDATA[ ]]> \xa0的 tag 在 XML 執行程式的語法，但網頁轉為靜態後是 HTML ,因此在  <![CDATA[ ]]> \xa0的 tag 前的斜線會變成註解，導致無法執行程式，所以在轉換成靜態的時候把\xa0 <![CDATA[ ]]> \xa0替換成空字串，就可以順利執行程式 \n \n \n \n', 'tags': '', 'url': '繪圖.html'}, {'title': 'ROC flag', 'text': ' 導入 Brython 標準程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n \n \n \n', 'tags': '', 'url': 'ROC flag.html'}, {'title': 'Spur Gears', 'text': ' 導入 Brython 標準程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n \n       Set Number of Gears \n \n \n \n', 'tags': '', 'url': 'Spur Gears.html'}, {'title': 'Mobile 網站內容', 'text': '\n', 'tags': '', 'url': 'Mobile 網站內容.html'}, {'title': 'Virtual Host', 'text': '依照老師說明來配置檔案: \n 利用 Virtualbox 建立虛擬 Ubuntu 18.04 網際內容管理系統伺服主機: 1. 安裝最新版的 Virtualbox 2. 建立 Ubuntu 18.04 虛擬主機 3. 以網路卡橋接啟動 Ubuntu 伺服器 4. 以 sudo apt install nginx 安裝 nginx WWW 伺服器 5. 以 ifconfig 查 Ubuntu 伺服器的 IP, 測試 nginx 伺服器是否可以連線 6. 以 Windows 10\xa0 下的 Filezilla client, 將編輯好的 nginx 設定檔案送到 Ubuntu 7.\xa0利用 Ubuntu 指令將設定檔案搬至設定位置後, 以 /etc/init.d/nginx restart 重新啟動 nginx 8. 在 Ubuntu 中以 sudo apt install uwsgi 安裝 uwsgi 9. 在 Windows 10 編輯 uwsgi 與 nginx 所需的設定檔案, 完成後以 filezilla 送至 Ubuntu. 10. 將 CMSimfly 程式碼送到 Ubuntu 伺服器中對應目錄後. 11. 在 Ubuntu 建立 cmsimfly 服務, 並設定隨機啟動. 12. 完成後, 在 Windows 10 以瀏覽器連線至 CMSimfly, 確認動態網頁與靜態網頁可以在虛擬主機中正常啟動. \n \n', 'tags': '', 'url': 'Virtual Host.html'}, {'title': 'Ubuntu系統安裝', 'text': '1.先至 Ubuntu 網站下載Server檔 \n 2.在Virtual Box建立一個新的virtual machine，並命名 \n 3.配置虛擬主機記憶體大小 \n 4.選擇建立一個新的硬碟 \n 5.選擇硬碟檔案形式 \n 6.選擇硬體儲存方式 \n 7.選擇硬碟檔案的存放位置和選擇檔案資料在硬碟可被儲存的大小 \n 8.建立完新的virtual machine後啟動它，再來選擇Ubuntu server檔(iso檔) \n 9.安裝完成重新啟動後順利出現要輸入密碼的畫面即成功 \n \n \n', 'tags': '', 'url': 'Ubuntu系統安裝.html'}, {'title': 'FileZilla', 'text': 'FileZilla可用於將近端的檔案上傳至虛擬主機的遠端內 \n 1.需先至打開Site Manager設定遠端主機的IP位置 \n 2.在Logon Type選擇用密碼登入 \n 3.接設定好後按下方的Connect連結至設定IP位置 \n 4.若連結成功即如下圖所示 \n \n \n', 'tags': '', 'url': 'FileZilla.html'}, {'title': 'vi 指令', 'text': 'sudo apt install _______ :安裝套件 \n sudo vi _______ : 編輯檔案 \n sudo rm _______:移除檔案 \n sudo netplan apply : 改完網路設定後若沒有更改，用此指令來更新 \n sudo cp (path from) (path to): 複製某路徑的檔案至所指定的位置 \n sudo apt update: 更新狀態 \n ls-1 :查詢當前目錄下有什麼檔案 \n ifconfig: 查詢ip相關資訊\xa0 \n 編輯狀態下: \n i :啟用可以輸入字元 \n Esc: 退出可輸入字元的模式 \n :q! :取消更改的資料 \n :wq :儲存更改資料 \n', 'tags': '', 'url': 'vi 指令.html'}, {'title': '期中報告', 'text': '40723123期中影片 \n \n \n 40723145期中影片 \n \n \n 40723150期中影片 \n \n \n 40723147期中影片 \n \n \n 40723136期中影片 \n \n 40723126期中影片 \n \n', 'tags': '', 'url': '期中報告.html'}, {'title': '期末報告', 'text': '40723123 \n 倉儲位置: https://mdecp2018.github.io/site-s40723123/content/index.html \n 期末報告影片: \n \n 40723126 倉儲位置: \n 期末報告影片: \n 40723136 \n 倉儲位置: \n 期末報告影片: \n 40723145 \n 倉儲位置: https://s40723145.github.io/wcm2019-45/content/index.html \n 期末報告影片: \n \n 40723147 \n 倉儲位置: https://github.com/s40723147/s40723147.github.io \n 期末報告影片: \n \n 40723150 \n 倉儲位置: \n 期末報告影片:', 'tags': '', 'url': '期末報告.html'}]};