package com.nwt.spade.domain;

import java.io.Serializable;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Document(collection = "projects")
public class Project extends AbstractAuditingEntity implements Serializable {

	@Size(max = 50)
    @Field("name")
	@Id
	private String name;
	@Size(max = 50)
    @Field("description")
	private String description;
	@JsonIgnore
	private Set<String> environments;
	@JsonIgnore
	private Set<User> users;
	@JsonIgnore
	private Set<Image> images;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Set<String> getEnvironments() {
		return environments;
	}
	public void setEnvironments(Set<String> environments) {
		this.environments = environments;
	}
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	public Set<User> getImages() {
		return users;
	}
	public void setImages(Set<Image> images) {
		this.images = images;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Project other = (Project) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Project [name=" + name + ", description=" + description
				+ ", environments=" + environments + ", users=" + users + "]";
	}
	
	
	
}
