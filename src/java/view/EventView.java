package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.event.*;

// classes in my project
import dbUtils.*;

public class EventView {

    public static StringDataList allEventsAPI(DbConn dbc, String tableName) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT name, date, location FROM " + tableName;
            // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in EventView.allEventsAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}
