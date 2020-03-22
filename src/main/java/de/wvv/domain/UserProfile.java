package de.wvv.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "address")
    private String address;

    @Column(name = "experience_in_years")
    private Long experienceInYears;

    @Column(name = "about_me")
    private String aboutMe;

    @Lob
    @Column(name = "profile_picture")
    private byte[] profilePicture;

    @Column(name = "profile_picture_content_type")
    private String profilePictureContentType;

    @Column(name = "telephone_long")
    private String telephoneLong;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_profile_interest",
               joinColumns = @JoinColumn(name = "user_profile_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "interest_id", referencedColumnName = "id"))
    private Set<Interest> interests = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_profile_working_style",
               joinColumns = @JoinColumn(name = "user_profile_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "working_style_id", referencedColumnName = "id"))
    private Set<WorkingStyle> workingStyles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_profile_professional_experience",
               joinColumns = @JoinColumn(name = "user_profile_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "professional_experience_id", referencedColumnName = "id"))
    private Set<ProfessionalExperience> professionalExperiences = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_profile_employee_style",
               joinColumns = @JoinColumn(name = "user_profile_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employee_style_id", referencedColumnName = "id"))
    private Set<EmployeeStyle> employeeStyles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public UserProfile firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public UserProfile lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public UserProfile address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getExperienceInYears() {
        return experienceInYears;
    }

    public UserProfile experienceInYears(Long experienceInYears) {
        this.experienceInYears = experienceInYears;
        return this;
    }

    public void setExperienceInYears(Long experienceInYears) {
        this.experienceInYears = experienceInYears;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public UserProfile aboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
        return this;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public UserProfile profilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getProfilePictureContentType() {
        return profilePictureContentType;
    }

    public UserProfile profilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
        return this;
    }

    public void setProfilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
    }

    public String getTelephoneLong() {
        return telephoneLong;
    }

    public UserProfile telephoneLong(String telephoneLong) {
        this.telephoneLong = telephoneLong;
        return this;
    }

    public void setTelephoneLong(String telephoneLong) {
        this.telephoneLong = telephoneLong;
    }

    public Set<Interest> getInterests() {
        return interests;
    }

    public UserProfile interests(Set<Interest> interests) {
        this.interests = interests;
        return this;
    }

    public UserProfile addInterest(Interest interest) {
        this.interests.add(interest);
        interest.getUserProfiles().add(this);
        return this;
    }

    public UserProfile removeInterest(Interest interest) {
        this.interests.remove(interest);
        interest.getUserProfiles().remove(this);
        return this;
    }

    public void setInterests(Set<Interest> interests) {
        this.interests = interests;
    }

    public Set<WorkingStyle> getWorkingStyles() {
        return workingStyles;
    }

    public UserProfile workingStyles(Set<WorkingStyle> workingStyles) {
        this.workingStyles = workingStyles;
        return this;
    }

    public UserProfile addWorkingStyle(WorkingStyle workingStyle) {
        this.workingStyles.add(workingStyle);
        workingStyle.getUserProfiles().add(this);
        return this;
    }

    public UserProfile removeWorkingStyle(WorkingStyle workingStyle) {
        this.workingStyles.remove(workingStyle);
        workingStyle.getUserProfiles().remove(this);
        return this;
    }

    public void setWorkingStyles(Set<WorkingStyle> workingStyles) {
        this.workingStyles = workingStyles;
    }

    public Set<ProfessionalExperience> getProfessionalExperiences() {
        return professionalExperiences;
    }

    public UserProfile professionalExperiences(Set<ProfessionalExperience> professionalExperiences) {
        this.professionalExperiences = professionalExperiences;
        return this;
    }

    public UserProfile addProfessionalExperience(ProfessionalExperience professionalExperience) {
        this.professionalExperiences.add(professionalExperience);
        professionalExperience.getUserProfiles().add(this);
        return this;
    }

    public UserProfile removeProfessionalExperience(ProfessionalExperience professionalExperience) {
        this.professionalExperiences.remove(professionalExperience);
        professionalExperience.getUserProfiles().remove(this);
        return this;
    }

    public void setProfessionalExperiences(Set<ProfessionalExperience> professionalExperiences) {
        this.professionalExperiences = professionalExperiences;
    }

    public Set<EmployeeStyle> getEmployeeStyles() {
        return employeeStyles;
    }

    public UserProfile employeeStyles(Set<EmployeeStyle> employeeStyles) {
        this.employeeStyles = employeeStyles;
        return this;
    }

    public UserProfile addEmployeeStyle(EmployeeStyle employeeStyle) {
        this.employeeStyles.add(employeeStyle);
        employeeStyle.getUserProfiles().add(this);
        return this;
    }

    public UserProfile removeEmployeeStyle(EmployeeStyle employeeStyle) {
        this.employeeStyles.remove(employeeStyle);
        employeeStyle.getUserProfiles().remove(this);
        return this;
    }

    public void setEmployeeStyles(Set<EmployeeStyle> employeeStyles) {
        this.employeeStyles = employeeStyles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProfile)) {
            return false;
        }
        return id != null && id.equals(((UserProfile) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", address='" + getAddress() + "'" +
            ", experienceInYears=" + getExperienceInYears() +
            ", aboutMe='" + getAboutMe() + "'" +
            ", profilePicture='" + getProfilePicture() + "'" +
            ", profilePictureContentType='" + getProfilePictureContentType() + "'" +
            ", telephoneLong='" + getTelephoneLong() + "'" +
            "}";
    }
}
