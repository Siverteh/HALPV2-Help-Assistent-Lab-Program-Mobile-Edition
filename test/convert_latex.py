import xml.etree.ElementTree as ET
from tabulate import tabulate

# Assuming 'report.xml' is your pytest report
with open('C:/Users/Sondre/IKT205/assignment/HALP/test/out_report.xml', 'r') as file:
    data = file.read()

root = ET.fromstring(data)

testcases = []

for testcase in root.iter('testcase'):
    classname = testcase.get('classname')
    name = testcase.get('name')
    time = testcase.get('time')
    status = 'Passed'  # Assume test passed by default

    # If there are any child elements in a testcase (like <error> or <failure>), the test failed
    for child in testcase:
        if child.tag in ['error', 'failure']:
            status = 'Failed'
            break

    status_color = 'green' if status == 'Passed' else 'red'

    testcases.append((classname, name, time, status, status_color))

with open('C:/Users/Sondre/IKT205/assignment/HALP/test/output.txt', 'w') as f:
    for i, (classname, name, time, status, status_color) in enumerate(testcases, start=1):
        f.write(f"""
\\begin{{enumerate}}
% Test for {name}
%-------------------------------------------------
    \\item {{\\begin{{tabular}}{{ |p{{4cm}}|p{{11cm}}|}}
\\hline
\\multicolumn{{2}}{{|c|}}{{\\textbf{{\\cellcolor{{pink}}Test requirements}}}} \\\\
\\hline
\\textbf{{Requirement id:}} &
Req-{i}\\\\
\\hline
\\textbf{{Requirements description:}} &
PLACEHOLDER FOR REQUIREMENTS DESCRIPTION\\\\
\\hline
\\textbf{{Pre-condition(s)}} &
PLACEHOLDER FOR PRE-CONDITION(S)\\\\
\\hline
\\textbf{{Test-steps}} & 
\\begin{{itemize}}
    \\item PLACEHOLDER FOR TEST STEPS
\\end{{itemize}}
\\\\
\\hline
\\textbf{{Expected result}} &
PLACEHOLDER FOR EXPECTED RESULT\\\\
\\hline
\\textbf{{Actual result}} &
PLACEHOLDER FOR ACTUAL RESULT\\\\
\\hline
\\textbf{{Status}} &
{{\\cellcolor{{{status_color}}}}} {status} in {time} sec\\\\
\\hline
\\end{{tabular}}}}
\\end{{enumerate}}
    """)