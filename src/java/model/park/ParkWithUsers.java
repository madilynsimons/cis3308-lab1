/*
This class will be good for web user update - provides a single web user plus the list of user Roles (for pick list).
 */
package model.park;

public class ParkWithUsers {

    public StringData park = new StringData();
    public model.webUser.StringDataList userInfo = new model.webUser.StringDataList();

}
