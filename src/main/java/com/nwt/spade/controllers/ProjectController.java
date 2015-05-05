package com.nwt.spade.controllers;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nwt.spade.controllers.KubernetesController.UpdateStatus;
import com.nwt.spade.exceptions.KubernetesOperationException;

@Service
public class ProjectController {
	
	private MongoDBController db;
	
	private static final Logger LOG = LoggerFactory
			.getLogger(ProjectController.class);

	@Autowired
	public ProjectController(MongoDBController db){
		this.db = db;
	}
	
	@PostConstruct
	public void init() {
		TimerTask updateTask = new UpdateStatus(this);
		Timer timer = new Timer(true);
		LOG.info("Setting TimerTask in ProjectController");
		// scheduling the task at fixed rate delay
		timer.scheduleAtFixedRate(updateTask, 15 * 1000, 3 * 1000);
	}
	
	public JsonArray addProject(String payload){
		
		return db.addProject(payload);
	}
	
	public JsonObject getProject(String payload){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "GetProject");
		objBuild.add("items", db.getProject(payload));
		return objBuild.build();
	}
	
	public JsonObject deleteProject(String payload){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "DeleteProject");
		objBuild.add("items", db.deleteProject(payload));
		return objBuild.build();
	}
	
	public JsonObject listAllProjects(){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "ListProjects");
		objBuild.add("items", db.getAllProjects());
		return objBuild.build();
	}
	
	public void updateProjects(){
		JsonArray projArr = db.getAllProjects();
		JsonArray imgArr = db.getAllImages("all");
		JsonArray userArr = db.getAllUsers();
		
		for(JsonValue proj: projArr){
			JsonObjectBuilder objBuild = Json.createObjectBuilder();
			for (String key: ((JsonObject)proj).keySet()){
				objBuild.add(key, ((JsonObject)proj).get(key));
			}
			
			JsonArray envArr = db.getAllControllers(((JsonObject)proj).getString("name"));
			JsonArrayBuilder tmp = Json.createArrayBuilder();
			for(JsonValue env: envArr){
				if(((JsonObject)env).getJsonObject("labels").getString("project").equals(((JsonObject)proj).getString("name"))){
					tmp.add(((JsonObject)env).get("id"));
				}
			}
			objBuild.add("environments", tmp.build());
			
			tmp = Json.createArrayBuilder();
			for(JsonValue img: imgArr){
				if(!((JsonObject)proj).getJsonArray("images").contains(((JsonObject)img).getString("image"))){
					tmp.add(((JsonObject)img).get("image"));
				}
			}
			objBuild.add("images", tmp.build());
			
			tmp = Json.createArrayBuilder();
			for(JsonValue user: userArr){
				for (JsonValue uproj: ((JsonObject)user).getJsonArray("projects")){
					String one = uproj.toString().replace("\"", "");
					String two = ((JsonObject)proj).getString("name");
					if(one.equalsIgnoreCase(two)){
						tmp.add(((JsonObject)user).get("name"));
					}
				}
			}
			objBuild.add("users", tmp.build());
			LOG.info("Project updated: "+ db.updateProject(objBuild.build().toString()));
		}
	}
	
//	public static void main(String[] args){
//		ProjectController test = new ProjectController(new MongoDBController(true));
//		test.updateProjects();
//	}
	
	public static class UpdateStatus extends TimerTask {

		private ProjectController projCont;

		public UpdateStatus(ProjectController projectController) {
			super();
			projCont = projectController;
		}

		@Override
		public void run() {
			try {
				projCont.updateProjects();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
}
