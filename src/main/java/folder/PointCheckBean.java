package folder;


import lombok.Getter;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import javax.faces.context.FacesContext;


@ManagedBean(name = "pointCheckBean")
@SessionScoped

@Getter
public class PointCheckBean implements Serializable {
    private double x;
    private double y;
    private double radius;
    @Getter
    private List<Result> results = Collections.synchronizedList(new ArrayList<>());
    private final Validator validator = new Validator();

    public void checkPoint() {
        String verdict = validator.checksPoint(x, y, radius);
        results.add(new Result(x, y, radius, verdict));

        MongoDBService mongoDBService = new MongoDBService();
        mongoDBService.saveToDB(x, y, radius, verdict);

    }

    public void clearResults() {
        results.clear();
        MongoDBService mongoDBService = new MongoDBService();
        mongoDBService.clearDB();
    }


    public String getCurrentTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return LocalDateTime.now().format(formatter);
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setRadius(double radius) {
        this.radius = radius;
        //checkPoint();
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }


    public void handleCheckPointAction() {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        Map<String, String> requestParameters = facesContext.getExternalContext().getRequestParameterMap();


        String checkPointAction = requestParameters.get("main-form:checkPointAction");

        if ("checkPoint".equals(checkPointAction)) {
            System.out.println("checkPointAction");
            checkPoint();
        }
    }

}
