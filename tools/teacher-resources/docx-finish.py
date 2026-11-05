# pandoc HTML -> DOCX, then give the classwork tables (marked GRIDTABLE) visible borders.
import sys, subprocess, zipfile, re, shutil, os
html, out = sys.argv[1], sys.argv[2]
tmp = out + '.tmp.docx'
subprocess.run(['pandoc', html, '-o', tmp], check=True)
zin = zipfile.ZipFile(tmp); zout = zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED)
B = '<w:tblBorders>' + ''.join(f'<w:{s} w:val="single" w:sz="8" w:space="0" w:color="A0A8A6"/>' for s in ['top','left','bottom','right','insideH','insideV']) + '</w:tblBorders>'
for item in zin.infolist():
    data = zin.read(item.filename)
    if item.filename == 'word/document.xml':
        x = data.decode('utf8')
        def fix(m):
            tbl = m.group(2)
            tbl = re.sub(r'<w:tblPr>', '<w:tblPr>' + B, tbl, count=1)
            return tbl
        x = re.sub(r'<w:p>(?:(?!<w:p>).)*?GRIDTABLE.*?</w:p>\s*(<w:tbl>.*?</w:tbl>)', lambda m: re.sub(r'<w:tblPr>', '<w:tblPr>' + B, m.group(1), count=1), x, flags=re.S)
        # BOXTABLE: a one-cell answer box, bordered and shaded (digital classwork).
        SHD = '<w:shd w:val="clear" w:color="auto" w:fill="EAF3F1"/>'
        def shade(t): return re.sub(r'<w:tcPr>', '<w:tcPr>' + SHD, re.sub(r'<w:tc>(?!<w:tcPr>)', '<w:tc><w:tcPr></w:tcPr>', t))
        x = re.sub(r'<w:p>(?:(?!<w:p>).)*?BOXTABLE.*?</w:p>\s*(<w:tbl>.*?</w:tbl>)', lambda m: shade(re.sub(r'<w:tblPr>', '<w:tblPr>' + B, m.group(1), count=1)), x, flags=re.S)
        # ANSWERCELL: shade a table cell students type in, then drop the marker.
        def cell(m):
            tc = m.group(0); tc = re.sub(r'<w:tc>(?!<w:tcPr>)', '<w:tc><w:tcPr></w:tcPr>', tc)
            return re.sub(r'<w:tcPr>', '<w:tcPr>' + SHD, tc, count=1).replace('ANSWERCELL', '')
        x = re.sub(r'<w:tc>(?:(?!<w:tc>).)*?ANSWERCELL.*?</w:tc>', cell, x, flags=re.S)
        x = re.sub(r'<w:p>(?:(?!<w:p>).)*?PAGEBREAK.*?</w:p>', '<w:p><w:r><w:br w:type="page"/></w:r></w:p>', x, flags=re.S)
        data = x.encode('utf8')
    zout.writestr(item, data)
zout.close(); os.remove(tmp)
