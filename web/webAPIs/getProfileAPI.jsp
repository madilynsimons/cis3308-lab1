<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData loggedOnWebUser = (StringData) session.getAttribute("webUser");
    Gson gson = new Gson();
    
    if(loggedOnWebUser == null){
        loggedOnWebUser = new StringData();
        loggedOnWebUser.errorMsg = "Error: Failed to find web user. Please log in.";
    }
    out.print(gson.toJson(loggedOnWebUser));
    
%>