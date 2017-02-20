package main

import (
       "fmt"
       "net/http"
       "net/url"
       "github.com/franela/goreq"
)

// Not working :(
func main() {
     res, _ := goreq.Request{Uri: "http://54.221.6.249/level1.php"}.Do()

     cookie := res.Header.Get("Set-Cookie")[12:52]
     fmt.Println(cookie)

     item := url.Values{}
     item.Add("key", "")
     item.Add("id", "70")
     item.Add("holdthedoor", "Submit")

     req, _ := goreq.Request{ Method: "POST",
     	       		      Uri: "http://54.221.6.249/level1.php",
			      Body: item.Encode() }.
			      WithCookie(&http.Cookie{Name: "holdthedoor", Value: cookie}).
			      Do()

     fmt.Println(req.Response)
}