function autocomplete(inp, arr, list, txt, ids, next, self) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  added.push(self);
  txt.value = self+", ";
  ids.value = self.split("[")[1].split("]")[0] + ", ";
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      console.log(added)
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && !added.includes(arr[i])) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
                $(next).attr('disabled', false);
              /*insert the value for the autocomplete text field:*/
              name = this.getElementsByTagName("input")[0].value;
              txt.value = txt.value + name + ", "
              ids.value = ids.value + name.split('[')[1].substring(0, name.split('[')[1].length-1) + ", "
              inp.value = this.getElementsByTagName("input")[0].value;
              att = document.createElement("DIV");
              att.setAttribute("id", this.getElementsByTagName("input")[0].value);
              attRem = document.createElement("BUTTON");
              attRem.innerHTML = "Remove";
              attRem.addEventListener("click", function(e) {
                e.preventDefault();
                console.log(name + "2");
                var currTxt = txt.value.split(',');
                var currIds = ids.value.split(',');
                console.log(currTxt[0] + " vs " + name);
                var newTxt = "", newIds = "";
                console.log(currTxt);
                const rem = this.parentNode.id;
                var i;
                for (i = 0; i < currTxt.length; i++) {
                  str = currTxt[i].trim();
                  strId = currIds[i].trim();
                  console.log(str + " v s " + rem);
                  if (str == rem) {

                  } else if (str.trim().length > 0){
                    newTxt = newTxt + str + ", ";
                    newIds = newIds + strId + ", ";
                  }
                }
                txt.value = newTxt;
                ids.value = newIds;
                name = this.parentNode.getElementsByTagName("span")[0].value;
                console.log(this.parentNode.id + "1");
                const index = added.indexOf(this.parentNode.id);
                added.splice(index, 1);
                console.log(this.parentNode.id + " added");
                list.removeChild(this.parentNode);
                if (currTxt.length <= 2) {
                  $(next).attr('disabled', true);
                }
              });
              att.appendChild(attRem);
              attName = document.createElement("SPAN");
              attName.innerHTML = this.getElementsByTagName("input")[0].value;
              att.appendChild(attName);
              inp.value = "";
              list.appendChild(att);
              added.push(this.getElementsByTagName("input")[0].value);
              // arr.pop(this.getElementsByTagName("input")[0].value);
              console.log(this.getElementsByTagName("input")[0].value + " deleted"); 
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}