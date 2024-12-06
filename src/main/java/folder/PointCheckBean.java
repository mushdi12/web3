package folder;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import dev.morphia.Datastore;
import dev.morphia.Morphia;
import lombok.Getter;
import lombok.Setter;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import java.io.IOException;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@ManagedBean(name = "pointCheckBean")
@SessionScoped
@Getter
@Setter
public class PointCheckBean implements Serializable {
    private double x;
    private double y;
    private double radius;
    @Getter
    private List<Result> results = new ArrayList<>();


    public void checkPoint() {
        boolean inside = (x >= 0 && y >= 0 && (x * x + y * y <= radius * radius));
        results.add(new Result(x, y, radius, inside));
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017"); // укажите свой URI подключения

        // Создаем объект Datastore для работы с MongoDB
        Datastore datastore = Morphia.createDatastore(mongoClient, "java"); // укажите имя своей базы данных

        // Создаем объект PointEntity
        PointEntity point = new PointEntity(x, y, radius, checksPoint(inside));

        // Сохраняем объект в MongoDB
        datastore.save(point);

        /*try {
            FacesContext.getCurrentInstance().getExternalContext().redirect("main.xhtml");
        } catch (IOException e) {
            e.printStackTrace();
        }// Это действие добавит объект в коллекцию MongoDB

         */
    }


    public String getCurrentTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return LocalDateTime.now().format(formatter);
    }

    public String checksPoint(boolean flag) {
        if (flag) {
            return "Внутри";
        }
        return "Вне";
    }
}
