<%@page language="java" import="com.google.gson.*" %>

<% 
    session.invalidate(); 
    
    Gson gson = new Gson();
    String successMessage = "Successful log out";
    out.print(gson.toJson(successMessage));
%>