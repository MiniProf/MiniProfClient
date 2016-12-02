var app ={
  initialize: function() {

  },
  onDeviceReady: function() {

  },
  prefLSID:"Prefs",
  bookLSID:"BookPos",
  getPreferences:()=>{
    return JSON.parse(window.localStorage.getItem(this.prefLSID));
  },
  setPreferences:(items)=>{
    window.localStorage.setItem(this.prefLSID,JSON.stringify(items));
  },
  setBookPos:(pos)=>{
    window.localStorage.setItem(this.bookLSID,pos);
  },
  getBookPos:()=>{
    return window.localStorage.getItem(this.bookLSID);
  },
  removeBookPos:()=>{
    window.localStorage.setItem(this.bookLSID,"");
  }
};

app.initialize();
