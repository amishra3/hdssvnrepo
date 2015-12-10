package com.hdscorp.cms.db.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Properties;

public class DbConnectionUtil {
	
	private static final Logger log = LoggerFactory
			.getLogger(DbConnectionUtil.class);

	public void init() {

		try {

			log.info("Registering Driver");
			DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
			log.info("Registered driver successfully");

		} catch (SQLException e) {
			log.error("Error while registering the driver", e);

		}

	}



	public Connection getDbConnection(String host, String schema, String userName, String password) {

		log.info("In getDbConnection Method");

		try {
			this.init();			
			log.info("In getDbConnection Method....");
			String URL = "jdbc:oracle:thin:@"+host+":"+schema;
			Properties info = new Properties();
			info.put("user", userName);
			info.put("password", password);
			log.info("connection URL" + URL);
			log.info("connectio username" + userName);			
			Connection conn = DriverManager.getConnection(URL, info);
			log.info("connection successful");
			return conn;

		} catch (SQLException e) {
			log.error("Error while getting connection" + e);
		}

		return null;

	}

	public void closeConnection(Connection con) {

		log.info("closing connection" + con);
		try {
			if(null != con){
			  con.close();
			  log.info("closed connection" + con);
			}

		} catch (SQLException e) {
			log.error("Error while closing the connection" + e);
			e.printStackTrace();
		}
}
}