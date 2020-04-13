    package model.park;
    import dbUtils.DbConn;
    import dbUtils.PrepStatement;
    import dbUtils.ValidationUtils;
    import java.sql.PreparedStatement;
    import java.sql.ResultSet;
    public class DbMods {

            public static StringData findById(DbConn dbc, String id) {

                StringData sd = new StringData();
                try {
                    String sql = "SELECT park_id, name, description, park.image, "
                            + "rating, cost, park.web_user_id, web_user.web_user_id, "
                            + "web_user.image, web_user.user_email "
                            + "FROM park, web_user WHERE park.web_user_id = web_user.web_user_id "
                            + "AND park_id = ?";

                    PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

                    // Encode the id (that the user typed in) into the select statement, into the first
                    // (and only) ?
                    stmt.setString(1, id);

                    ResultSet results = stmt.executeQuery();
                    if (results.next()) { // id is unique, one or zero records expected in result set
                        sd = new StringData(results);
                    } else {
                        sd.errorMsg = "The database has no Park with id " + id;
                    }
                    results.close();
                    stmt.close();
                } catch (Exception e) {
                    sd.errorMsg = "Exception thrown in model.park.DbMods.findById(): " + e.getMessage();
                }
                return sd;

            } // findById


            /*
            Returns a "StringData" object that is full of field level validation
            error messages (or it is full of all empty strings if inputData
            totally passed validation.
             */
            private static StringData validate(StringData inputData) {

                StringData errorMsgs = new StringData();

                // Validation
                errorMsgs.name = ValidationUtils.stringValidationMsg(inputData.name, 45, true);
                errorMsgs.image = ValidationUtils.stringValidationMsg(inputData.image, 200, false);
                errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.name, 1000, false);
                errorMsgs.rating = ValidationUtils.decimalValidationMsg(inputData.rating, false);
                errorMsgs.cost = ValidationUtils.decimalValidationMsg(inputData.cost, false);
                errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

                return errorMsgs;
            } // validate

            public static StringData insert(StringData inputData, DbConn dbc) {

                StringData errorMsgs = new StringData();
                errorMsgs = validate(inputData);
                if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                    errorMsgs.errorMsg = "Please try again";
                    return errorMsgs;

                } else { // all fields passed validation

                    /*
                          String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                            "web_user.user_role_id, user_role_type "+
                            "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " +
                            "ORDER BY web_user_id ";
                     */
                    // Start preparing SQL statement
                    String sql = "INSERT INTO park (name, image, description, rating, cost, web_user_id) "
                            + "values (?, ?, ?, ?, ?, ?)";

                    // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                    // Only difference is that Sally's class takes care of encoding null
                    // when necessary. And it also System.out.prints exception error messages.
                    PrepStatement pStatement = new PrepStatement(dbc, sql);

                    // Encode string values into the prepared statement (wrapper class).
                    pStatement.setString(1, inputData.name); // string type is simple
                    pStatement.setString(2, inputData.image);
                    pStatement.setString(3, inputData.description);
                    pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.rating));
                    pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(inputData.cost));
                    pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));

                    // here the SQL statement is actually executed
                    int numRows = pStatement.executeUpdate();

                    // This will return empty string if all went well, else all error messages.
                    errorMsgs.errorMsg = pStatement.getErrorMsg();
                    if (errorMsgs.errorMsg.length() == 0) {
                        if (numRows == 1) {
                            errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                        } else {
                            // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                            errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                        }
                    } else if (errorMsgs.errorMsg.contains("foreign key")) {
                        errorMsgs.errorMsg = "Invalid Web User Id";
                    } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                        errorMsgs.errorMsg = "That park name is already taken";
                    }

                } // customerId is not null and not empty string.
                return errorMsgs;
            } // insert

            public static StringData update(StringData inputData, DbConn dbc) {

                StringData errorMsgs = new StringData();
                errorMsgs = validate(inputData);
                if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                    errorMsgs.errorMsg = "Please try again";
                    return errorMsgs;

                } else { // all fields passed validation

                    /*
                        String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                            "web_user.user_role_id, user_role_type "+
                            "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " +
                            "ORDER BY web_user_id ";
                     */
                    String sql = "UPDATE park SET name=?, description=?, rating=?, cost=?, "
                            + "web_user_id=? WHERE park_id = ?";

                    // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                    // Only difference is that Sally's class takes care of encoding null
                    // when necessary. And it also System.out.prints exception error messages.
                    PrepStatement pStatement = new PrepStatement(dbc, sql);

                    // Encode string values into the prepared statement (wrapper class).
                    pStatement.setString(1, inputData.name); // string type is simple
                    pStatement.setString(2, inputData.description);
                    pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.rating));
                    pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.cost));
                    pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
                    pStatement.setInt(6, ValidationUtils.integerConversion(inputData.parkId));

                    // here the SQL statement is actually executed
                    int numRows = pStatement.executeUpdate();

                    // This will return empty string if all went well, else all error messages.
                    errorMsgs.errorMsg = pStatement.getErrorMsg();
                    if (errorMsgs.errorMsg.length() == 0) {
                        if (numRows == 1) {
                            errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                        } else {
                            // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                            errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                        }
                    } else if (errorMsgs.errorMsg.contains("foreign key")) {
                        errorMsgs.errorMsg = "Invalid Web User Id";
                    } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                        errorMsgs.errorMsg = "That park name is already taken";
                    }

                } // customerId is not null and not empty string.
                return errorMsgs;
            } // update
} // class
