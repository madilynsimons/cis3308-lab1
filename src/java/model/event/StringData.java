package model.event;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the
 * character data that the user might type in when they want to
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed
 * in a character string where a number was expected.
 *
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String eventId = "";
    public String name = "";
    public String date = "";
    public String location = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.eventId = FormatUtils.formatInteger(results.getObject("event_id"));
            this.name = FormatUtils.formatString(results.getObject("name"));
            this.date = FormatUtils.formatDate(results.getObject("date"));
            this.location = FormatUtils.formatString(results.getObject("location"));

        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.park.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.eventId + this.name + this.date + this.location;
        return s.length();
    }

    public String toString() {
        return "Event Id: " + this.eventId
                + ", Name: " + this.name
                + ", Date: " + this.date
                + ", Location: " + this.location;
    }
}
