<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.event.*" %>
<%@page language="java" import="view.EventView" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList list = new StringDataList();
    String tableName = request.getParameter("tableName");
    String dbUrl = request.getParameter("dbUrl");

    if(tableName == null){
      list.dbError = "Cannot insert -- missing 'tableName' parameter";
      System.out.println(list.dbError);
    } else if (dbUrl == null){
      list.dbError = "Cannot insert -- missing 'dbUrl' parameter";
      System.out.println(list.dbError);
    } else {
      DbConn dbc = new DbConn(dbUrl);
      list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

      if (list.dbError.length() == 0) { // if got good DB connection,

          System.out.println("*** Ready to call allEventsAPI");
          list = EventView.allEventsAPI(dbc, tableName);
      } else {
          System.out.println("Error in listEventsAPI");
          System.out.println(list.dbError);

      }

      dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object)
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>
