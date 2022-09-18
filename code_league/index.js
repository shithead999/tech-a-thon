
let code_area = document.getElementById('code-area')
let output_area = document.getElementById('output-area')

output_area.value = ""

let lang = "cpp"

let setPython = () => {lang = "py"}
let setCpp = () => {lang = "cpp"}
let setNode = () => {lang = "js"}


let executeCode = async ()=>{
	let obj = {
		language: lang,
		code: code_area.value
	}
	output_area.value = "Executing....."
	const response = await fetch("/run", {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(obj) 
	}).then((response) => response.json())
    .then((ans) => {
    	console.log(ans)
       if (ans.output){
			output_area.value = "\n\nOutput: \n\n" + ans.output
       }
       else{
			output_area.value = "\n\n\t----Failed To Execute----"			
       }
    });
}