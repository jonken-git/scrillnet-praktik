var select = document.getElementById('elSelect')
var addButt = document.getElementById('addElement')
var finalForm = document.getElementById('resultForm')
var placeholder1 = document.getElementById('placeholder1')
var placeholder2 = document.getElementById('placeholder2')
var formEditor = document.getElementById('formeditor')
var editorContainer = document.getElementById('currEl')
var submitButt = document.getElementById('submit')
var submitsettings = document.getElementById('submitSettings')
var submitDetails = document.getElementById('submitdetails')
var submitContainer = document.getElementById('submitcontainer')
var globStyles = document.getElementById('globstyle')
var saveButton = document.getElementById('saveForm')
var elements = []
var labels = []
var editors = []

var dbData = []

function input(type,id,append,name) {
    var input = document.createElement('input')
    input.type = type
    input.id = id
    input.name = name
    append.appendChild(input)
    return input
}

function label(id,text,insert,before) { 
    var label = document.createElement('label')
    label.htmlFor = id
    label.innerText = text
    insert.insertBefore(label,before)
}

var submitOptions = submitsettings.getElementsByTagName('input')
for (var r of submitOptions) {r.addEventListener('change', function() {
    if (this.type == 'radio') {
        console.log(submitButt.type+'->'+this.value)
        submitButt.type = this.value;
        if (this.value == 'image') {
            var inputs = submitDetails.getElementsByTagName('input')
            for (var i of inputs) {i.removeAttribute('disabled')}
        }
        else {
            var inputs = submitDetails.getElementsByTagName('input')
            for (var i of inputs) {i.setAttribute('disabled','true')}
        }
    }
    else {
        submitButt.setAttribute(this.name,this.value)
    }
})}

function generateData() {
    dbData = []
    elements.forEach(
        (elmnt,index) => {
            var dbElement = {}
            var attrs = []
            dbElement.type = elmnt.type
            dbElement.label = labels[index].label.innerText
            for (namer of elmnt.getAttributeNames()) {
                attrs.push(namer + ':' + elmnt.getAttribute(namer))
            }
            dbElement.data = attrs
            console.log(dbElement)
            dbData.push(dbElement)
        }
    )
    console.log(dbData)
    document.getElementById('data').value = JSON.stringify(dbData)
}

function updateStyles() {
    if (elements.length != 0 && this.validity.valid == true) {
        var target = this.name
        var change = this.value
        
        styles[target] = change;
        var stylesArr = [];
        Object.entries(styles).forEach(([key, value]) => {
            if (value == '') {return}
            stylesArr.push(key + ":" + value);
        })
        var styleString = stylesArr.join("; ")
        elements.forEach(el => {
            el.setAttribute('style',styleString)
            console.log(target+': '+change+';')
        })
    }
    else {console.warn('no elements or invalid input')}
}

var styles = {};
var styleOptions = globStyles.getElementsByTagName('input')
var styleSelect = globStyles.getElementsByTagName('select')

styleSelect[0].addEventListener('change',updateStyles)

for (var option of styleOptions) {option.addEventListener('change',updateStyles)}

var reset = document.createElement('input')
reset.type = 'reset'
document.getElementById('reset').addEventListener('click',function() {
    if (!submitContainer.contains(reset)) {
        console.log(submitContainer.contains(reset))
        submitContainer.insertBefore(reset,submitButt)
    }
    else {
        submitContainer.removeChild(reset)
    }
})

addButt.addEventListener('click', function() {
    if (select.value == 'none') {alert('no element selected')}
    else {
        //create element
        var newElement = document.createElement('input')
        //set type
        newElement.type = select.value
        //set id
        newElement.id = elements.length + 1
        //remove placeholder
        if (finalForm.contains(placeholder1))
        {finalForm.removeChild(placeholder1)}
        if (editorContainer.contains(placeholder2))
        {editorContainer.removeChild(placeholder2)}
        //insert in form
        finalForm.insertBefore(newElement,submitContainer)
        //add to elements array
        elements.push(newElement)
        //create label
        var newLabel = document.createElement('label')
        //write text
        newLabel.innerText = 'Label text'
        //select target
        newLabel.htmlFor = elements.length
        //insert label
        finalForm.insertBefore(newLabel,newElement)
        //add to labels array
        labels.push({label:newLabel,id:labels.length})
        //create settings box
        var newSettings = document.createElement('fieldset')
        //set class and id
        newSettings.className = 'setting'
        newSettings.id = elements.length
        //add box to editor
        editorContainer.appendChild(newSettings)
        //create header
        var legend = document.createElement('legend')
        //insert text
        legend.innerText = select.value
        //create remove button
        var remove = document.createElement('input')
        //set type
        remove.type = 'button'
        //set id
        remove.id = elements.length
        //set value
        remove.value = 'remove'
        //add to legend
        legend.appendChild(remove)
        //add to settings
        newSettings.appendChild(legend)
        //create settings
        var labelText = input('text',elements.length + ',0',newSettings,'innerText')
        labelText.required = true
        //label
        label(elements.length + ',0','Text of the label',newSettings,labelText)
        if (select.value == 'file') {
            var accept = input('text',elements.length + ',1',newSettings,'accept')
            accept.title = 'File extensions like .png or MIME-types like image/png'
            //label
            label(elements.length + ',1','Supported file types',newSettings,accept)
        }
        if (select.value == 'checkbox' || select.value == 'radio') {
            var checked = input('checkbox',elements.length + ',2',newSettings,'checked')
            //label
            label(elements.length + ',2','Automatically checked/selected?',newSettings,checked)
        }
        var disButton = input('checkbox',elements.length + ',3',newSettings,'disabled')
        //label
        label(elements.length + ',3','Disabled?',newSettings,disButton)
        if (select.value == 'date' || select.value == 'month' ||select.value == 'week' || select.value == 'time' || select.value == 'datetime-local' || select.value == 'number' || select.value == 'range') {
            var max = input('number',elements.length + ',4',newSettings,'max')
            //label
            label(elements.length+ ',4','Max value',newSettings,max)
        }
        if (select.value == 'text' || select.value == 'search' || select.value == 'url' || select.value == 'tel' || select.value == 'email' || select.value == 'password') {
            var maxL = input('range',elements.length + ',5',newSettings,'maxlength')
            //label
            label(elements.length + ',5','Max length',newSettings,maxL)
        }
        if (select.value == 'date' || select.value == 'month' ||select.value == 'week' || select.value == 'time' || select.value == 'datetime-local' || select.value == 'number' || select.value == 'range') {
            var min = input('number',elements.length + ',6',newSettings,'min')
            //label
            label(elements.length + ',6','Min value',newSettings,min)
        }
        if (select.value == 'text' || select.value == 'search' || select.value == 'url' || select.value == 'tel' || select.value == 'email' || select.value == 'password') {
            var minL = input('range',elements.length + ',7',newSettings,'minlength')
            //label
            label(elements.length + ',7','Min length',newSettings,minL)
        }
        if (select.value == 'email' || select.value == 'file') {
            var multi = input('checkbox',elements.length + ',8',newSettings,'multiple')
            //label
            label(elements.length + ',8','Allow multiple inputs',newSettings,multi)
        }
        var name = input('text',elements.length + ',9',newSettings,'name')
        name.required = true
        //label
        label(elements.length + ',9','Name to be submitted',newSettings,name)
        if (select.value == 'text' || select.value == 'search' || select.value == 'url' || select.value == 'tel' || select.value == 'email' || select.value == 'password') {
            var pattern = input('text',elements.length + ',10',newSettings,'pattern')
            //label
            label(elements.length + ',10','Pattern that the input must match',newSettings,pattern)
        }
        if (select.value == 'text' || select.value == 'search' ||select.value == 'tel' ||select.value == 'email'||select.value == 'password'||select.value == 'url' || select.value == 'number') {
            var placeholder = input('text',elements.length + ',11',newSettings,'placeholder')
            //label
            label(elements.length + ',11','Text visible when nothing is entered',newSettings,placeholder)
        }
        if (select.value != 'button' && select.value != 'range' && select.value != 'color') {
            var required = input('checkbox',elements.length + ',12',newSettings,'required')
            //label
            label(elements.length + ',12','Required to submit the form?',newSettings,required)
        }
        if (select.value == 'text' || select.value == 'search' || select.value == 'url' || select.value == 'email' || select.value == 'password') {
            var sizeSlider = input('range',elements.length + ',13',newSettings,'size')
            //label
            label(elements.length + ',13','Width in amount of characters',newSettings,sizeSlider)
        }
        if (select.value == 'date' || select.value == 'month' || select.value == 'week' || select.value == 'time' || select.value == 'datetime-local' || select.value == 'number' || select.value == 'range') {
            var step = input('number',elements.length + ',14',newSettings,'step')
            //label
            label(elements.length + ',14','How big steps input is changed in',newSettings,step)
        }
        var value = input('text',elements.length + ',15',newSettings,'value')
        value.title = 'For buttons this is a required static value, for other inputs it\'s only a placeholder and will be replaced with the user input'
        //label
        label(elements.length + ',15','Value to be submitted',newSettings,value)
        //create listeners
        remove.addEventListener('click',() => {
            finalForm.removeChild(newLabel)
            finalForm.removeChild(newElement)
            editorContainer.removeChild(newSettings)
            elements.splice(newElement,1)
            labels.splice(newLabel,1)
            if (newElement.classList.contains('focused')) {
                newElement.classList.remove('focused')
            }
        })
        newSettings.addEventListener('mouseenter',() => {
            elements[newSettings.id-1].classList.add('focused')
            //console.log(newSettings.id-1)
        })
        newSettings.addEventListener('mouseleave',() => {
            elements[newSettings.id-1].classList.remove('focused')
            //console.log(newSettings.id-1)
        })
        const children = newSettings.children;
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener('change'/*input*/, (event) => {
                var thingToChange = children[i].name
                var value = children[i].value
                if (children[i].name == 'innerText') {
                    labels[newSettings.id-1].label.innerText = value
                    console.log(newSettings.id-1)
                    console.log(children[i] + ',' + thingToChange + ',' + value)
                }
                else {
                    if (children[i].type != 'checkbox') {
                        elements[newSettings.id-1].setAttribute(thingToChange,value)
                        console.log(newSettings.id-1)
                    }
                    console.log(children[i] + ',' + thingToChange + ',' + value)
                    if (children[i].type == 'checkbox') {
                        if (children[i].value == 'on') {
                            elements[newSettings.id-1].setAttribute(thingToChange,value)
                        }
                        else {elements[newSettings.id-1].removeAttribute(thingToChange)}
                        console.log('value was '+children[i].value)
                        value == 'on' ? children[i].value = 'off' : children[i].value = 'on'
                        console.log('value now '+children[i].value)
                    }
                }
                generateData()
            });
        }
        //add to editors array
        editors.push(formEditor)
    }
})