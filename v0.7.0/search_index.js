var documenterSearchIndex = {"docs":
[{"location":"api/#API-Reference-1","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"api/#","page":"API Reference","title":"API Reference","text":"XLSX.XLSXFile\nXLSX.readxlsx\nXLSX.openxlsx\nXLSX.writexlsx\nXLSX.sheetnames\nXLSX.sheetcount\nXLSX.Worksheet\nXLSX.readdata\nXLSX.getdata\nXLSX.getcell\nXLSX.getcellrange\nXLSX.row_number\nXLSX.column_number\nXLSX.eachrow\nXLSX.readtable\nXLSX.gettable\nXLSX.eachtablerow\nXLSX.writetable\nXLSX.writetable!\nXLSX.rename!\nXLSX.addsheet!","category":"page"},{"location":"api/#XLSX.XLSXFile","page":"API Reference","title":"XLSX.XLSXFile","text":"XLSXFile represents a reference to an Excel file.\n\nIt is created by using XLSX.readxlsx or XLSX.openxlsx.\n\nFrom a XLSXFile you can navigate to a XLSX.Worksheet reference as shown in the example below.\n\nExample\n\nxf = XLSX.readxlsx(\"myfile.xlsx\")\nsh = xf[\"mysheet\"] # get a reference to a Worksheet\n\n\n\n\n\n","category":"type"},{"location":"api/#XLSX.readxlsx","page":"API Reference","title":"XLSX.readxlsx","text":"readxlsx(filepath) :: XLSXFile\n\nMain function for reading an Excel file. This function will read the whole Excel file into memory and return a closed XLSXFile.\n\nConsider using XLSX.openxlsx for lazy loading of Excel file contents.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.openxlsx","page":"API Reference","title":"XLSX.openxlsx","text":"openxlsx(f::Function, filepath::AbstractString; mode::AbstractString=\"r\", enable_cache::Bool=true)\n\nOpen XLSX file for reading and/or writing. It returns an opened XLSXFile that will be automatically closed after applying f to the file.\n\nDo syntax\n\nThis function should be used with do syntax, like in:\n\nXLSX.openxlsx(\"myfile.xlsx\") do xf\n    # read data from `xf`\nend\n\nFilemodes\n\nThe mode argument controls how the file is opened. The following modes are allowed:\n\nr : read mode. The existing data in filepath will be accessible for reading. This is the default mode.\nw : write mode. Opens an empty file that will be written to filepath.\nrw : edit mode. Opens filepath for editing. The file will be saved to disk when the function ends.\n\nArguments\n\nfilepath is the complete path to the file.\nmode is the file mode, as explained in the last section.\nenable_cache:\n\nIf enable_cache=true, all read worksheet cells will be cached. If you read a worksheet cell twice it will use the cached value instead of reading from disk in the second time.\n\nIf enable_cache=false, worksheet cells will always be read from disk. This is useful when you want to read a spreadsheet that doesn't fit into memory.\n\nThe default value is enable_cache=true.\n\nExamples\n\nRead from file\n\nThe following example shows how you would read worksheet cells, one row at a time, where myfile.xlsx is a spreadsheet that doesn't fit into memory.\n\njulia> XLSX.openxlsx(\"myfile.xlsx\", enable_cache=false) do xf\n          for r in XLSX.eachrow(xf[\"mysheet\"])\n              # read something from row `r`\n          end\n       end\n\nWrite a new file\n\nXLSX.openxlsx(\"new.xlsx\", mode=\"w\") do xf\n    sheet = xf[1]\n    sheet[1, :] = [1, Date(2018, 1, 1), \"test\"]\nend\n\nEdit an existing file\n\nXLSX.openxlsx(\"edit.xlsx\", mode=\"rw\") do xf\n    sheet = xf[1]\n    sheet[2, :] = [2, Date(2019, 1, 1), \"add new line\"]\nend\n\nSee also XLSX.readxlsx.\n\n\n\n\n\nopenxlsx(filepath; mode=\"r\", enable_cache=true) :: XLSXFile\n\nSupports opening a XLSX file without using do-syntax. In this case, the user is responsible for closing the XLSXFile using close or writing it to file using XLSX.writexlsx.\n\nSee also XLSX.writexlsx.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.writexlsx","page":"API Reference","title":"XLSX.writexlsx","text":"writexlsx(output_filepath, xlsx_file; [overwrite=false])\n\nWrites an Excel file given by xlsx_file::XLSXFile to file at path output_filepath.\n\nIf overwrite=true, output_filepath will be overwritten if it exists.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.sheetnames","page":"API Reference","title":"XLSX.sheetnames","text":"sheetnames(xl::XLSXFile)\nsheetnames(wb::Workbook)\n\nReturns a vector with Worksheet names for this Workbook.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.sheetcount","page":"API Reference","title":"XLSX.sheetcount","text":"sheetcount(xlsfile) :: Int\n\nCounts the number of sheets in the Workbook.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.Worksheet","page":"API Reference","title":"XLSX.Worksheet","text":"A Worksheet represents a reference to an Excel Worksheet.\n\nFrom a Worksheet you can query for Cells, cell values and ranges.\n\nExample\n\nxf = XLSX.readxlsx(\"myfile.xlsx\")\nsh = xf[\"mysheet\"] # get a reference to a Worksheet\nprintln( sh[2, 2] ) # access element \"B2\" (2nd row, 2nd column)\nprintln( sh[\"B2\"] ) # you can also use the cell name\nprintln( sh[\"A2:B4\"] ) # or a cell range\nprintln( sh[:] ) # all data inside worksheet's dimension\n\n\n\n\n\n","category":"type"},{"location":"api/#XLSX.readdata","page":"API Reference","title":"XLSX.readdata","text":"readdata(filepath, sheet, ref)\nreaddata(filepath, sheetref)\n\nReturns a scalar or matrix with values from a spreadsheet.\n\nSee also XLSX.getdata.\n\nExamples\n\nThese function calls are equivalent.\n\njulia> XLSX.readdata(\"myfile.xlsx\", \"mysheet\", \"A2:B4\")\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"\n\njulia> XLSX.readdata(\"myfile.xlsx\", 1, \"A2:B4\")\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"\n\njulia> XLSX.readdata(\"myfile.xlsx\", \"mysheet!A2:B4\")\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.getdata","page":"API Reference","title":"XLSX.getdata","text":"getdata(sheet, ref)\ngetdata(sheet, row, column)\n\nReturns a escalar or a matrix with values from a spreadsheet. ref can be a cell reference or a range.\n\nIndexing in a Worksheet will dispatch to getdata method.\n\nExample\n\njulia> f = XLSX.readxlsx(\"myfile.xlsx\")\n\njulia> sheet = f[\"mysheet\"]\n\njulia> matrix = sheet[\"A1:B4\"]\n\njulia> single_value = sheet[2, 2] # B2\n\nSee also XLSX.readdata.\n\n\n\n\n\ngetdata(ws::Worksheet, cell::Cell) :: CellValue\n\nReturns a Julia representation of a given cell value. The result data type is chosen based on the value of the cell as well as its style.\n\nFor example, date is stored as integers inside the spreadsheet, and the style is the information that is taken into account to chose Date as the result type.\n\nFor numbers, if the style implies that the number is visualized with decimals, the method will return a float, even if the underlying number is stored as an integer inside the spreadsheet XML.\n\nIf cell has empty value or empty String, this function will return missing.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.getcell","page":"API Reference","title":"XLSX.getcell","text":"getcell(xlsxfile, cell_reference_name) :: AbstractCell\ngetcell(worksheet, cell_reference_name) :: AbstractCell\ngetcell(sheetrow, column_name) :: AbstractCell\ngetcell(sheetrow, column_number) :: AbstractCell\n\nReturns the internal representation of a worksheet cell.\n\nReturns XLSX.EmptyCell if the cell has no data.\n\n\n\n\n\ngetcell(sheet, ref)\n\nReturns an AbstractCell that represents a cell in the spreadsheet.\n\nExample:\n\njulia> xf = XLSX.readxlsx(\"myfile.xlsx\")\n\njulia> sheet = xf[\"mysheet\"]\n\njulia> cell = XLSX.getcell(sheet, \"A1\")\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.getcellrange","page":"API Reference","title":"XLSX.getcellrange","text":"getcellrange(sheet, rng)\n\nReturns a matrix with cells as Array{AbstractCell, 2}. rng must be a valid cell range, as in \"A1:B2\".\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.row_number","page":"API Reference","title":"XLSX.row_number","text":"row_number(c::CellRef) :: Int\n\nReturns the row number of a given cell reference.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.column_number","page":"API Reference","title":"XLSX.column_number","text":"column_number(c::CellRef) :: Int\n\nReturns the column number of a given cell reference.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.eachrow","page":"API Reference","title":"XLSX.eachrow","text":"eachrow(sheet)\n\nCreates a row iterator for a worksheet.\n\nExample: Query all cells from columns 1 to 4.\n\nleft = 1  # 1st column\nright = 4 # 4th column\nfor sheetrow in XLSX.eachrow(sheet)\n    for column in left:right\n        cell = XLSX.getcell(sheetrow, column)\n\n        # do something with cell\n    end\nend\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.readtable","page":"API Reference","title":"XLSX.readtable","text":"readtable(filepath, sheet, [columns]; [first_row], [column_labels], [header], [infer_eltypes], [stop_in_empty_row], [stop_in_row_function]) -> data, column_labels\n\nReturns tabular data from a spreadsheet as a tuple (data, column_labels). data is a vector of columns. column_labels is a vector of symbols. Use this function to create a DataFrame from package DataFrames.jl.\n\nUse columns argument to specify which columns to get. For example, \"B:D\" will select columns B, C and D. If columns is not given, the algorithm will find the first sequence of consecutive non-empty cells.\n\nUse first_row to indicate the first row from the table. first_row=5 will look for a table starting at sheet row 5. If first_row is not given, the algorithm will look for the first non-empty row in the spreadsheet.\n\nheader is a Bool indicating if the first row is a header. If header=true and column_labels is not specified, the column labels for the table will be read from the first row of the table. If header=false and column_labels is not specified, the algorithm will generate column labels. The default value is header=true.\n\nUse column_labels as a vector of symbols to specify names for the header of the table.\n\nUse infer_eltypes=true to get data as a Vector{Any} of typed vectors. The default value is infer_eltypes=false.\n\nstop_in_empty_row is a boolean indicating wether an empty row marks the end of the table. If stop_in_empty_row=false, the TableRowIterator will continue to fetch rows until there's no more rows in the Worksheet. The default behavior is stop_in_empty_row=true.\n\nstop_in_row_function is a Function that receives a TableRow and returns a Bool indicating if the end of the table was reached.\n\nExample for stop_in_row_function:\n\nfunction stop_function(r)\n    v = r[:col_label]\n    return !ismissing(v) && v == \"unwanted value\"\nend\n\nRows where all column values are equal to missing are dropped.\n\nExample\n\nIn this example, the ... operator will splat the tuple (data, column_labels) into the constructor of DataFrame.\n\njulia> using DataFrames, XLSX\n\njulia> df = DataFrame(XLSX.readtable(\"myfile.xlsx\", \"mysheet\")...)\n\nSee also: XLSX.gettable.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.gettable","page":"API Reference","title":"XLSX.gettable","text":"gettable(sheet, [columns]; [first_row], [column_labels], [header], [infer_eltypes], [stop_in_empty_row], [stop_in_row_function]) -> data, column_labels\n\nReturns tabular data from a spreadsheet as a tuple (data, column_labels). data is a vector of columns. column_labels is a vector of symbols. Use this function to create a DataFrame from package DataFrames.jl.\n\nUse columns argument to specify which columns to get. For example, columns=\"B:D\" will select columns B, C and D. If columns is not given, the algorithm will find the first sequence of consecutive non-empty cells.\n\nUse first_row to indicate the first row from the table. first_row=5 will look for a table starting at sheet row 5. If first_row is not given, the algorithm will look for the first non-empty row in the spreadsheet.\n\nheader is a Bool indicating if the first row is a header. If header=true and column_labels is not specified, the column labels for the table will be read from the first row of the table. If header=false and column_labels is not specified, the algorithm will generate column labels. The default value is header=true.\n\nUse column_labels as a vector of symbols to specify names for the header of the table.\n\nUse infer_eltypes=true to get data as a Vector{Any} of typed vectors. The default value is infer_eltypes=false.\n\nstop_in_empty_row is a boolean indicating wether an empty row marks the end of the table. If stop_in_empty_row=false, the TableRowIterator will continue to fetch rows until there's no more rows in the Worksheet. The default behavior is stop_in_empty_row=true.\n\nstop_in_row_function is a Function that receives a TableRow and returns a Bool indicating if the end of the table was reached.\n\nExample for stop_in_row_function:\n\nfunction stop_function(r)\n    v = r[:col_label]\n    return !ismissing(v) && v == \"unwanted value\"\nend\n\nRows where all column values are equal to missing are dropped.\n\nExample\n\nIn this example, the ... operator will splat the tuple (data, column_labels) into the constructor of DataFrame.\n\njulia> using DataFrames, XLSX\n\njulia> df = XLSX.openxlsx(\"myfile.xlsx\") do xf\n                DataFrame(XLSX.gettable(xf[\"mysheet\"])...)\n            end\n\nSee also: XLSX.readtable.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.eachtablerow","page":"API Reference","title":"XLSX.eachtablerow","text":"eachtablerow(sheet, [columns]; [first_row], [column_labels], [header], [stop_in_empty_row], [stop_in_row_function])\n\nConstructs an iterator of table rows. Each element of the iterator is of type TableRow.\n\nheader is a boolean indicating wether the first row of the table is a table header.\n\nIf header == false and no names were supplied, column names will be generated following the column names found in the Excel file. Also, the column range will be inferred by the non-empty contiguous cells in the first row of the table.\n\nThe user can replace column names by assigning the optional names input variable with a Vector{Symbol}.\n\nstop_in_empty_row is a boolean indicating wether an empty row marks the end of the table. If stop_in_empty_row=false, the iterator will continue to fetch rows until there's no more rows in the Worksheet. The default behavior is stop_in_empty_row=true. Empty rows may be returned by the iterator when stop_in_empty_row=false.\n\nstop_in_row_function is a Function that receives a TableRow and returns a Bool indicating if the end of the table was reached.\n\nExample for stop_in_row_function:\n\nfunction stop_function(r)\n    v = r[:col_label]\n    return !ismissing(v) && v == \"unwanted value\"\nend\n\nExample code:\n\nfor r in XLSX.eachtablerow(sheet)\n    # r is a `TableRow`. Values are read using column labels or numbers.\n    rn = XLSX.row_number(r) # `TableRow` row number.\n    v1 = r[1] # will read value at table column 1.\n    v2 = r[:COL_LABEL2] # will read value at column labeled `:COL_LABEL2`.\nend\n\nSee also XLSX.gettable.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.writetable","page":"API Reference","title":"XLSX.writetable","text":"writetable(filename, data, columnnames; [overwrite], [sheetname])\n\ndata is a vector of columns. columnames is a vector of column labels. overwrite is a Bool to control if filename should be overwritten if already exists. sheetname is the name for the worksheet.\n\nExample using DataFrames.jl:\n\nimport DataFrames, XLSX\ndf = DataFrames.DataFrame(integers=[1, 2, 3, 4], strings=[\"Hey\", \"You\", \"Out\", \"There\"], floats=[10.2, 20.3, 30.4, 40.5])\nXLSX.writetable(\"df.xlsx\", collect(DataFrames.eachcol(df)), DataFrames.names(df))\n\nSee also: XLSX.writetable!.\n\n\n\n\n\nwritetable(filename::AbstractString; overwrite::Bool=false, kw...)\nwritetable(filename::AbstractString, tables::Vector{Tuple{String, Vector{Any}, Vector{String}}}; overwrite::Bool=false)\n\nWrite multiple tables.\n\nkw is a variable keyword argument list. Each element should be in this format: sheetname=( data, column_names ), where data is a vector of columns and column_names is a vector of column labels.\n\nExample:\n\nimport DataFrames, XLSX\n\ndf1 = DataFrames.DataFrame(COL1=[10,20,30], COL2=[\"Fist\", \"Sec\", \"Third\"])\ndf2 = DataFrames.DataFrame(AA=[\"aa\", \"bb\"], AB=[10.1, 10.2])\n\nXLSX.writetable(\"report.xlsx\", REPORT_A=( collect(DataFrames.eachcol(df1)), DataFrames.names(df1) ), REPORT_B=( collect(DataFrames.eachcol(df2)), DataFrames.names(df2) ))\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.writetable!","page":"API Reference","title":"XLSX.writetable!","text":"writetable!(sheet::Worksheet, data, columnnames; anchor_cell::CellRef=CellRef(\"A1\"))\n\nWrites tabular data data with labels given by columnnames to sheet, starting at anchor_cell.\n\ndata must be a vector of columns. columnnames must be a vector of column labels.\n\nSee also: XLSX.writetable.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.rename!","page":"API Reference","title":"XLSX.rename!","text":"rename!(ws::Worksheet, name::AbstractString)\n\nRenames a Worksheet.\n\n\n\n\n\n","category":"function"},{"location":"api/#XLSX.addsheet!","page":"API Reference","title":"XLSX.addsheet!","text":"addsheet!(workbook, [name]) :: Worksheet\n\nCreate a new worksheet with named name. If name is not provided, a unique name is created.\n\n\n\n\n\n","category":"function"},{"location":"#XLSX.jl-1","page":"Home","title":"XLSX.jl","text":"","category":"section"},{"location":"#Introduction-1","page":"Home","title":"Introduction","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"XLSX.jl is a Julia package to read and write Excel spreadsheet files.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Internally, an Excel XLSX file is just a Zip file with a set of XML files inside. The formats for these XML files are described in the Standard ECMA-376.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This package follows the EMCA-376 to parse and generate XLSX files.","category":"page"},{"location":"#Requirements-1","page":"Home","title":"Requirements","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Julia v1.0\nLinux, macOS or Windows.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"From a Julia session, run:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> using Pkg\n\njulia> Pkg.add(\"XLSX\")","category":"page"},{"location":"#Source-Code-1","page":"Home","title":"Source Code","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The source code for this package is hosted at https://github.com/felipenoris/XLSX.jl.","category":"page"},{"location":"#License-1","page":"Home","title":"License","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The source code for the package XLSX.jl is licensed under the MIT License.","category":"page"},{"location":"#Getting-Help-1","page":"Home","title":"Getting Help","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"If you're having any trouble, have any questions about this package or want to ask for a new feature, just open a new issue.","category":"page"},{"location":"#Contributing-1","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Contributions are always welcome!","category":"page"},{"location":"#","page":"Home","title":"Home","text":"To contribute, fork the project on GitHub and send a Pull Request.","category":"page"},{"location":"#References-1","page":"Home","title":"References","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"ECMA Open XML White Paper\nECMA-376\nExcel file limits","category":"page"},{"location":"#Alternative-Packages-1","page":"Home","title":"Alternative Packages","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"ExcelFiles.jl\nExcelReaders.jl\nXLSXReader.jl\nTaro.jl","category":"page"},{"location":"tutorial/#Tutorial-1","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/#Setup-1","page":"Tutorial","title":"Setup","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"First, make sure you have XLSX.jl package installed.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Pkg\n\njulia> Pkg.add(\"XLSX\")","category":"page"},{"location":"tutorial/#Getting-Started-1","page":"Tutorial","title":"Getting Started","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The basic usage is to read an Excel file and read values.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> import XLSX\n\njulia> xf = XLSX.readxlsx(\"myfile.xlsx\")\nXLSXFile(\"myfile.xlsx\") containing 3 Worksheets\n            sheetname size          range\n-------------------------------------------------\n              mysheet 4x2           A1:B4\n           othersheet 1x1           A1:A1\n                named 1x1           B4:B4\n\njulia> XLSX.sheetnames(xf)\n3-element Array{String,1}:\n \"mysheet\"\n \"othersheet\"\n \"named\"\n\njulia> sh = xf[\"mysheet\"] # get a reference to a Worksheet\n4×2 XLSX.Worksheet: [\"mysheet\"](A1:B4)\n\njulia> sh[2, 2] # access element \"B2\" (2nd row, 2nd column)\n\"first\"\n\njulia> sh[\"B2\"] # you can also use the cell name\n\"first\"\n\njulia> sh[\"A2:B4\"] # or a cell range\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"\n\njulia> XLSX.readdata(\"myfile.xlsx\", \"mysheet\", \"A2:B4\") # shorthand for all above\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"\n\njulia> sh[:] # all data inside worksheet's dimension\n4×2 Array{Any,2}:\n  \"HeaderA\"  \"HeaderB\"\n 1           \"first\"\n 2           \"second\"\n 3           \"third\"\n\njulia> xf[\"mysheet!A2:B4\"] # you can also query values using a sheet reference\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"\n\njulia> xf[\"NAMED_CELL\"] # you can even read named ranges\n\"B4 is a named cell from sheet \\\"named\\\"\"\n\njulia> xf[\"mysheet!A:B\"] # Column ranges are also supported\n4×2 Array{Any,2}:\n  \"HeaderA\"  \"HeaderB\"\n 1           \"first\"\n 2           \"second\"\n 3           \"third\"","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"To inspect the internal representation of each cell, use the getcell or getcellrange methods.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The example above used xf = XLSX.readxlsx(filename) to open a file, so all file contents are fetched at once from disk.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"You can also use XLSX.openxlsx to read file contents as needed (see Reading Large Excel Files and Caching).","category":"page"},{"location":"tutorial/#Read-Tabular-Data-1","page":"Tutorial","title":"Read Tabular Data","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The XLSX.gettable method returns tabular data from a spreadsheet as a tuple (data, column_labels). You can use it to create a DataFrame from DataFrames.jl. Check the docstring for gettable method for more advanced options.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"There's also a helper method XLSX.readtable to read from file directly, as shown in the following example. In this case, the ... operator will splat the tuple (data, column_labels) into the constructor of DataFrame.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using DataFrames, XLSX\n\njulia> df = DataFrame(XLSX.readtable(\"myfile.xlsx\", \"mysheet\")...)\n3×2 DataFrames.DataFrame\n│ Row │ HeaderA │ HeaderB  │\n├─────┼─────────┼──────────┤\n│ 1   │ 1       │ \"first\"  │\n│ 2   │ 2       │ \"second\" │\n│ 3   │ 3       │ \"third\"  │","category":"page"},{"location":"tutorial/#Reading-Cells-as-a-Julia-Matrix-1","page":"Tutorial","title":"Reading Cells as a Julia Matrix","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Use XLSX.readdata or XLSX.getdata to read content as a Julia matrix.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> import XLSX\n\njulia> m = XLSX.readdata(\"myfile.xlsx\", \"mysheet!A1:B3\")\n3×2 Array{Any,2}:\n  \"HeaderA\"  \"HeaderB\"\n 1           \"first\"\n 2           \"second\"","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Indexing in a Worksheet will dispatch to XLSX.getdata method.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> xf = XLSX.readxlsx(\"myfile.xlsx\")\nXLSXFile(\"myfile.xlsx\") containing 3 Worksheets\n            sheetname size          range\n-------------------------------------------------\n              mysheet 4x2           A1:B4\n           othersheet 1x1           A1:A1\n                named 1x1           B4:B4\n\njulia> xf[\"mysheet!A1:B3\"]\n3×2 Array{Any,2}:\n  \"HeaderA\"  \"HeaderB\"\n 1           \"first\"\n 2           \"second\"\n\njulia> sheet = xf[\"mysheet\"]\n4×2 XLSX.Worksheet: [\"mysheet\"](A1:B4)\n\njulia> sheet[\"A1:B3\"]\n3×2 Array{Any,2}:\n  \"HeaderA\"  \"HeaderB\"\n 1           \"first\"\n 2           \"second\"","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"But indexing in a single cell will return a single value instead of a matrix.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> sheet[\"A1\"]\n\"HeaderA\"","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"If you don't know the desired range in advance, you can take advantage of the XLSX.readtable and XLSX.gettable methods.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> columns, labels = XLSX.readtable(\"myfile.xlsx\", \"mysheet\")\n(Any[Any[1, 2, 3], Any[\"first\", \"second\", \"third\"]], Symbol[:HeaderA, :HeaderB])\n\njulia> m = hcat(columns...)\n3×2 Array{Any,2}:\n 1  \"first\"\n 2  \"second\"\n 3  \"third\"","category":"page"},{"location":"tutorial/#Reading-Large-Excel-Files-and-Caching-1","page":"Tutorial","title":"Reading Large Excel Files and Caching","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The method XLSX.openxlsx has a enable_cache option to control worksheet cells caching.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Cache is enabled by default, so if you read a worksheet cell twice it will use the cached value instead of reading from disk in the second time.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"If enable_cache=false, worksheet cells will always be read from disk. This is useful when you want to read a spreadsheet that doesn't fit into memory.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The following example shows how you would read worksheet cells, one row at a time, where myfile.xlsx is a spreadsheet that doesn't fit into memory.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> XLSX.openxlsx(\"myfile.xlsx\", enable_cache=false) do f\n           sheet = f[\"mysheet\"]\n           for r in XLSX.eachrow(sheet)\n              # r is a `SheetRow`, values are read using column references\n              rn = XLSX.row_number(r) # `SheetRow` row number\n              v1 = r[1]    # will read value at column 1\n              v2 = r[\"B\"]  # will read value at column 2\n\n              println(\"v1=$v1, v2=$v2\")\n           end\n      end\nv1=HeaderA, v2=HeaderB\nv1=1, v2=first\nv1=2, v2=second\nv1=3, v2=third","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"You could also stream tabular data using XLSX.eachtablerow(sheet), which is the underlying iterator in gettable method. Check docstrings for XLSX.eachtablerow for more advanced options.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> XLSX.openxlsx(\"myfile.xlsx\", enable_cache=false) do f\n           sheet = f[\"mysheet\"]\n           for r in XLSX.eachtablerow(sheet)\n               # r is a `TableRow`, values are read using column labels or numbers\n               rn = XLSX.row_number(r) # `TableRow` row number\n               v1 = r[1] # will read value at table column 1\n               v2 = r[:HeaderB] # will read value at column labeled `:HeaderB`\n\n               println(\"v1=$v1, v2=$v2\")\n            end\n       end\nv1=1, v2=first\nv1=2, v2=second\nv1=3, v2=third","category":"page"},{"location":"tutorial/#Writing-Excel-Files-1","page":"Tutorial","title":"Writing Excel Files","text":"","category":"section"},{"location":"tutorial/#Create-New-Files-1","page":"Tutorial","title":"Create New Files","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Opening a file in write mode with XLSX.openxlsx will open a new (blank) Excel file for editing.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"XLSX.openxlsx(\"my_new_file.xlsx\", mode=\"w\") do xf\n    sheet = xf[1]\n    XLSX.rename!(sheet, \"new_sheet\")\n    sheet[\"A1\"] = \"this\"\n    sheet[\"A2\"] = \"is a\"\n    sheet[\"A3\"] = \"new file\"\n    sheet[\"A4\"] = 100\n\n    # will add a row from \"A5\" to \"E5\"\n    sheet[\"A5\"] = collect(1:5) # equivalent to `sheet[\"A5\", dim=2] = collect(1:4)`\n\n    # will add a column from \"B1\" to \"B4\"\n    sheet[\"B1\", dim=1] = collect(1:4)\n\n    # will add a matrix from \"A7\" to \"C9\"\n    sheet[\"A7:C9\"] = [ 1 2 3 ; 4 5 6 ; 7 8 9 ]\nend","category":"page"},{"location":"tutorial/#Edit-Existing-Files-1","page":"Tutorial","title":"Edit Existing Files","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Opening a file in read-write mode with XLSX.openxlsx will open an existing Excel file for editing. This will preserve existing data in the original file.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"XLSX.openxlsx(\"my_new_file.xlsx\", mode=\"rw\") do xf\n    sheet = xf[1]\n    sheet[\"B1\"] = \"new data\"\nend","category":"page"},{"location":"tutorial/#Export-Tabular-Data-1","page":"Tutorial","title":"Export Tabular Data","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Given a sheet reference, use the XLSX.writetable! method. Anchor cell defaults to cell \"A1\".","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"using XLSX, Test\n\nfilename = \"myfile.xlsx\"\n\ncolumns = Vector()\npush!(columns, [1, 2, 3])\npush!(columns, [\"a\", \"b\", \"c\"])\n\nlabels = [ \"column_1\", \"column_2\"]\n\nXLSX.openxlsx(filename, mode=\"w\") do xf\n    sheet = xf[1]\n    XLSX.writetable!(sheet, columns, labels, anchor_cell=XLSX.CellRef(\"B2\"))\nend\n\n# read data back\nXLSX.openxlsx(filename) do xf\n    sheet = xf[1]\n    @test sheet[\"B2\"] == \"column_1\"\n    @test sheet[\"C2\"] == \"column_2\"\n    @test sheet[\"B3\"] == 1\n    @test sheet[\"B4\"] == 2\n    @test sheet[\"B5\"] == 3\n    @test sheet[\"C3\"] == \"a\"\n    @test sheet[\"C4\"] == \"b\"\n    @test sheet[\"C5\"] == \"c\"\nend","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"You can also use XLSX.writetable to write directly to a new file (see next section).","category":"page"},{"location":"tutorial/#Export-Tabular-Data-as-a-DataFrame-1","page":"Tutorial","title":"Export Tabular Data as a DataFrame","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"To export tabular data to Excel, use XLSX.writetable method.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Dates\n\njulia> import DataFrames, XLSX\n\njulia> df = DataFrames.DataFrame(integers=[1, 2, 3, 4], strings=[\"Hey\", \"You\", \"Out\", \"There\"], floats=[10.2, 20.3, 30.4, 40.5], dates=[Date(2018,2,20), Date(2018,2,21), Date(2018,2,22), Date(2018,2,23)], times=[Dates.Time(19,10), Dates.Time(19,20), Dates.Time(19,30), Dates.Time(19,40)], datetimes=[Dates.DateTime(2018,5,20,19,10), Dates.DateTime(2018,5,20,19,20), Dates.DateTime(2018,5,20,19,30), Dates.DateTime(2018,5,20,19,40)])\n4×6 DataFrames.DataFrame\n│ Row │ integers │ strings │ floats │ dates      │ times    │ datetimes           │\n├─────┼──────────┼─────────┼────────┼────────────┼──────────┼─────────────────────┤\n│ 1   │ 1        │ Hey     │ 10.2   │ 2018-02-20 │ 19:10:00 │ 2018-05-20T19:10:00 │\n│ 2   │ 2        │ You     │ 20.3   │ 2018-02-21 │ 19:20:00 │ 2018-05-20T19:20:00 │\n│ 3   │ 3        │ Out     │ 30.4   │ 2018-02-22 │ 19:30:00 │ 2018-05-20T19:30:00 │\n│ 4   │ 4        │ There   │ 40.5   │ 2018-02-23 │ 19:40:00 │ 2018-05-20T19:40:00 │\n\njulia> XLSX.writetable(\"df.xlsx\", collect(DataFrames.eachcol(df)), DataFrames.names(df))","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"You can also export multiple tables to Excel, each table in a separate worksheet.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> import DataFrames, XLSX\n\njulia> df1 = DataFrames.DataFrame(COL1=[10,20,30], COL2=[\"Fist\", \"Sec\", \"Third\"])\n3×2 DataFrames.DataFrame\n│ Row │ COL1 │ COL2  │\n├─────┼──────┼───────┤\n│ 1   │ 10   │ Fist  │\n│ 2   │ 20   │ Sec   │\n│ 3   │ 30   │ Third │\n\njulia> df2 = DataFrames.DataFrame(AA=[\"aa\", \"bb\"], AB=[10.1, 10.2])\n2×2 DataFrames.DataFrame\n│ Row │ AA │ AB   │\n├─────┼────┼──────┤\n│ 1   │ aa │ 10.1 │\n│ 2   │ bb │ 10.2 │\n\njulia> XLSX.writetable(\"report.xlsx\", REPORT_A=( collect(DataFrames.eachcol(df1)), DataFrames.names(df1) ), REPORT_B=( collect(DataFrames.eachcol(df2)), DataFrames.names(df2) ))","category":"page"},{"location":"tutorial/#Tables.jl-interface-1","page":"Tutorial","title":"Tables.jl interface","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"The type XLSX.TableRowIterator conforms to Tables.jl interface. An instance of XLSX.TableRowIterator is created by the function XLSX.eachtablerow.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"Also, XLSX.writetable accepts an argument that conforms to the Tables.jl interface.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"As an example, the type DataFrame from DataFrames package supports the Tables.jl interface. The following code writes and reads back a DataFrame to an Excel file.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"julia> using Dates\n\njulia> import DataFrames, XLSX\n\njulia> df = DataFrames.DataFrame(integers=[1, 2, 3, 4], strings=[\"Hey\", \"You\", \"Out\", \"There\"], floats=[10.2, 20.3, 30.4, 40.5], dates=[Date(2018,2,20), Date(2018,2,21), Date(2018,2,22), Date(2018,2,23)], times=[Dates.Time(19,10), Dates.Time(19,20), Dates.Time(19,30), Dates.Time(19,40)], datetimes=[Dates.DateTime(2018,5,20,19,10), Dates.DateTime(2018,5,20,19,20), Dates.DateTime(2018,5,20,19,30), Dates.DateTime(2018,5,20,19,40)])\n4×6 DataFrames.DataFrame\n│ Row │ integers │ strings │ floats  │ dates      │ times    │ datetimes           │\n│     │ Int64    │ String  │ Float64 │ Date       │ Time     │ DateTime            │\n├─────┼──────────┼─────────┼─────────┼────────────┼──────────┼─────────────────────┤\n│ 1   │ 1        │ Hey     │ 10.2    │ 2018-02-20 │ 19:10:00 │ 2018-05-20T19:10:00 │\n│ 2   │ 2        │ You     │ 20.3    │ 2018-02-21 │ 19:20:00 │ 2018-05-20T19:20:00 │\n│ 3   │ 3        │ Out     │ 30.4    │ 2018-02-22 │ 19:30:00 │ 2018-05-20T19:30:00 │\n│ 4   │ 4        │ There   │ 40.5    │ 2018-02-23 │ 19:40:00 │ 2018-05-20T19:40:00 │\n\njulia> XLSX.writetable(\"output_table.xlsx\", df, overwrite=true, sheetname=\"report\", anchor_cell=\"B2\")\n\njulia> f = XLSX.readxlsx(\"output_table.xlsx\")\nXLSXFile(\"output_table.xlsx\") containing 1 Worksheet\n            sheetname size          range\n-------------------------------------------------\n               report 6x7           A1:G6\n\n\njulia> s = f[\"report\"]\n6×7 XLSX.Worksheet: [\"report\"](A1:G6)\n\njulia> df2 = XLSX.eachtablerow(s) |> DataFrames.DataFrame\n4×6 DataFrames.DataFrame\n│ Row │ integers │ strings │ floats  │ dates      │ times    │ datetimes           │\n│     │ Int64    │ String  │ Float64 │ Date       │ Time     │ DateTime            │\n├─────┼──────────┼─────────┼─────────┼────────────┼──────────┼─────────────────────┤\n│ 1   │ 1        │ Hey     │ 10.2    │ 2018-02-20 │ 19:10:00 │ 2018-05-20T19:10:00 │\n│ 2   │ 2        │ You     │ 20.3    │ 2018-02-21 │ 19:20:00 │ 2018-05-20T19:20:00 │\n│ 3   │ 3        │ Out     │ 30.4    │ 2018-02-22 │ 19:30:00 │ 2018-05-20T19:30:00 │\n│ 4   │ 4        │ There   │ 40.5    │ 2018-02-23 │ 19:40:00 │ 2018-05-20T19:40:00 │","category":"page"}]
}
