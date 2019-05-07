var r = -1;

var mx = 6; // maximum
var a = new Array();


function AddNumsToDict(){
    var m,n,i,j;
    i = 0;
    j = 0;
    while (i <= 6)
    {
       m = (500 * Math.random()) + 1;
       n = Math.floor(m);
       
       for (j=0;j<=6;j++)
       {
         if (a[j] == (n-1))
         {
	   j = -1;
           break;
         }
       }
       if (j != -1)
       {
	 //a.push(n-1);
         a[i] = (n-1);
         i++;
	 j=0;
       }

    }
    return;
    
}

function xbElem(id){
  var elm = null;

  if (document.getElementById)
  {
    // browser implements part of W3C DOM HTML
    // Gecko, Internet Explorer 5+, Opera 5+
    elm = document.getElementById(id);
  }
  else if (document.all)
  {
    // Internet Explorer 4 or Opera with IE user agent
    elm = document.all[id];
  }
  else if (document.layers)
  {
    // Navigator 4
    elm = document.layers[id];
  }
  return(elm)
}

function AssignPadding(mystr)
{
  var v,wdth,fac,re;
  if (screen.width == 800)
  {
     wdth = 8.0;
     fac = 6;
  }
  else
  {
     wdth = 8.0;
     fac = 6;
     
  }
  if (mystr.indexOf("&nbsp;") != -1)
  {
	re = /&nbsp;*/gm;
	mystr = mystr.replace(re,"Z");
	//alert(mystr);
  }
  if (mystr.indexOf("<u>") != -1)
  {
   	re = /<u>*/gm;
        mystr = mystr.replace(re, "");
        re = /<\/u>*/gm;
	mystr = mystr.replace(re, "");
  }

  if (mystr.indexOf("<br>") != -1)
  {
    var ss, t;
    var lngest, pad;
    ss = mystr.split("<br>");
    lngest = ss[0].length;
    for (t=0; t < ss.length; t++)
    {
      if (ss[t].length > lngest)
      {
        lngest = ss[t].length;
      }
    }
    
    pad = ( wdth - ((lngest * fac)/72) ) / 2;
    //alert(lngest);
    v = pad;
  }
  else
  {
    lngest = mystr.length;
    pad = ( wdth - ((lngest * fac)/72) ) / 2;

    v = pad;
  }

  return(v)
}

function HideInstruct()
{
    instruct1.style.visibility = 'hidden';
}

function startup()
{
  var s;
  var oTable1 = xbElem('outer');
  var oMytd = xbElem('mytd');
  var oPrev = xbElem('prev');

  if ((oMytd) && (oTable1) && (oPrev)){
  if (screen.width == 800)
  {
     oTable1.style.fontSize ='8pt';

  }
  else
  {
     oTable1.style.fontSize = '10pt';
  }

  s = "instructions<br><br><br>Tom Hackshaw";
  //oMytd.style.paddingLeft = AssignPadding(s) + 'in';
  //s = s.replace("<br><br><br>","\n\n\n");
  SetCookie("pg", -1);
  if (document.layers){
    DynWrite("aID",s)
  }
  else
  {
    oMytd.innerHTML= s;
  }
  oPrev.disabled=true;
  AddNumsToDict();
  }
  else
   alert('Problem in startup');
}

function SetCookie(sName, sValue)
{
  document.cookie = sName + "=" + escape(sValue) + ";"
  
}

function GetCookie(sName)
{
  // cookies are separated by semicolons
  var aCookie = document.cookie.split("; ");
  for (var i=0; i < aCookie.length; i++)
  {
    // a name/value pair (a crumb) is separated by an equal sign
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0]) 
      return unescape(aCrumb[1]);
  }

  // a cookie with the requested name does not exist
  return null;
}

function previous(){
  var oPrev = xbElem('prev');
  var oNxt = xbElem('nxt');

  if ((oNxt) && (oPrev))
  {
    var num = GetCookie("pg");
    if (num == mx){ //maximum
      SetCookie("pg",parseInt(num) - 1);
      num = GetCookie("pg");
    }
    oNxt.disabled = false;
  
    if (num <= 1){
      oPrev.disabled = true;
    }
    if (num >= 1){
      readText(num, "prev");
      SetCookie("pg",parseInt(num) - 1);
    }
  }
}

function next(){
var oPrev = xbElem('prev');
var oNxt = xbElem('nxt');
  if ((oNxt) && (oPrev))
  {
  var num = GetCookie("pg");
  if (num > -1){
    oPrev.disabled = false;
  }
  else{
    oPrev.disabled = true;
  }
  if (num >= parseInt(mx)-1){  //maximum - 1
    oNxt.disabled = true;
  }
  else {
    oNxt.disabled = false;
  }
  if (num <= parseInt(mx)-2){
    readText(num,"next");
    SetCookie("pg",parseInt(num)+1);
  }
  }
}

function readText(r, direction)
{
var oTable1 = xbElem('outer');
var oMytd = xbElem('mytd');

       if ((oMytd) && (oTable1))
       {
	var k;
	  if (r < mx)  //maximum 
	  {
		
		if (direction == "next") {
		  r++;
		}
		else {
		  r--;
		}
		//k = AssignPadding(Caption[a[r]])
		//oMytd.style.paddingLeft = k + 'in'	
		if (document.body.filters){	
		  if (direction == "next") {
		    oTable1.filters[0].apply();
		  }
		  else {
		    oTable1.filters[1].apply();
		  }

		}
                if (document.layers){
		  DynWrite('aID',Caption[a[r]]);
                }
		else {
		  oMytd.innerHTML = Caption[a[r]];
                }
		if (document.body.filters){
		  if (direction == "next") {
		    oTable1.filters[0].play();
		  }
		  else {
		    oTable1.filters[1].play();
		  }
                }
	  }

    }
}

IE5=document.all? 1:0
if(!IE5) // Must capture the event if it is NS6.0 and NS4.0+
{
document.captureEvents(Event.KEYPRESS)
document.captureEvents(Event.KEYUP)
}
document.onkeypress = testKey; // when a key is pressed perform testkey function
document.onkeyup = resetButton; // when the key is no longer held down...

function testKey(e)
{
  var oPrev = xbElem('prev');
  var oNxt = xbElem('nxt');

  /* Grab the ascii code of the key that was pressed */
  var whKey = !IE5? e.which:event.keyCode;

  switch (String.fromCharCode(whKey))
  {
    case "B" :
    case "b" :
      previous();
      break;
    case "N" :
    case "n" :
      next();
      break;
    case "H" :
    case "h" :
     oPrev.innerHTML = GetCookie("pg").toString();
     oNxt.innerHTML = (mx - GetCookie("pg")).toString();
     break;
  }
}

function resetButton(e){

  var oPrev = xbElem('prev');
  var oNxt = xbElem('nxt');
  IE5=document.all? 1:0
  if ((oNxt) && (oPrev)){
   
    /* Grab the ascii code of the key that was pressed */
    var whKey = !IE5? e.which:event.keyCode;

     if ((String.fromCharCode(whKey)) == "h"){ 
	alert('h key pressed');
      	oPrev.innerHTML = "back";
      	oNxt.innerHTML = "next";
    	return(true);
	}
  }
  else{
	alert('problem in resetButton');
  }
  
}
