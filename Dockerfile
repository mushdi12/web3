# Используем официальный образ WildFly
FROM jboss/wildfly:20.0.0.Final

# Устанавливаем JAVA_HOME на правильный путь для данного образа
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk

# Устанавливаем рабочую директорию
WORKDIR /opt/jboss/wildfly

# Копируем WAR файл в директорию развертывания WildFly
COPY ./target/Lab_3-1.0-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/

# Открываем порты для WildFly
EXPOSE 8080 9990

# Используем entrypoint из образа WildFly (по умолчанию)
ENTRYPOINT ["./bin/standalone.sh", "-b", "0.0.0.0"]
