package de.wvv.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "telephone_long")
    private String telephoneLong;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_company",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"))
    private Set<Company> companies = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_working_style",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "working_style_id", referencedColumnName = "id"))
    private Set<WorkingStyle> workingStyles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_professional_experience",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "professional_experience_id", referencedColumnName = "id"))
    private Set<ProfessionalExperience> professionalExperiences = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "offer_employee_style",
               joinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employee_style_id", referencedColumnName = "id"))
    private Set<EmployeeStyle> employeeStyles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Offer title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public Offer address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public Offer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTelephoneLong() {
        return telephoneLong;
    }

    public Offer telephoneLong(String telephoneLong) {
        this.telephoneLong = telephoneLong;
        return this;
    }

    public void setTelephoneLong(String telephoneLong) {
        this.telephoneLong = telephoneLong;
    }

    public Set<Company> getCompanies() {
        return companies;
    }

    public Offer companies(Set<Company> companies) {
        this.companies = companies;
        return this;
    }

    public Offer addCompany(Company company) {
        this.companies.add(company);
        company.getOffers().add(this);
        return this;
    }

    public Offer removeCompany(Company company) {
        this.companies.remove(company);
        company.getOffers().remove(this);
        return this;
    }

    public void setCompanies(Set<Company> companies) {
        this.companies = companies;
    }

    public Set<WorkingStyle> getWorkingStyles() {
        return workingStyles;
    }

    public Offer workingStyles(Set<WorkingStyle> workingStyles) {
        this.workingStyles = workingStyles;
        return this;
    }

    public Offer addWorkingStyle(WorkingStyle workingStyle) {
        this.workingStyles.add(workingStyle);
        workingStyle.getOffers().add(this);
        return this;
    }

    public Offer removeWorkingStyle(WorkingStyle workingStyle) {
        this.workingStyles.remove(workingStyle);
        workingStyle.getOffers().remove(this);
        return this;
    }

    public void setWorkingStyles(Set<WorkingStyle> workingStyles) {
        this.workingStyles = workingStyles;
    }

    public Set<ProfessionalExperience> getProfessionalExperiences() {
        return professionalExperiences;
    }

    public Offer professionalExperiences(Set<ProfessionalExperience> professionalExperiences) {
        this.professionalExperiences = professionalExperiences;
        return this;
    }

    public Offer addProfessionalExperience(ProfessionalExperience professionalExperience) {
        this.professionalExperiences.add(professionalExperience);
        professionalExperience.getOffers().add(this);
        return this;
    }

    public Offer removeProfessionalExperience(ProfessionalExperience professionalExperience) {
        this.professionalExperiences.remove(professionalExperience);
        professionalExperience.getOffers().remove(this);
        return this;
    }

    public void setProfessionalExperiences(Set<ProfessionalExperience> professionalExperiences) {
        this.professionalExperiences = professionalExperiences;
    }

    public Set<EmployeeStyle> getEmployeeStyles() {
        return employeeStyles;
    }

    public Offer employeeStyles(Set<EmployeeStyle> employeeStyles) {
        this.employeeStyles = employeeStyles;
        return this;
    }

    public Offer addEmployeeStyle(EmployeeStyle employeeStyle) {
        this.employeeStyles.add(employeeStyle);
        employeeStyle.getOffers().add(this);
        return this;
    }

    public Offer removeEmployeeStyle(EmployeeStyle employeeStyle) {
        this.employeeStyles.remove(employeeStyle);
        employeeStyle.getOffers().remove(this);
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
        if (!(o instanceof Offer)) {
            return false;
        }
        return id != null && id.equals(((Offer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", address='" + getAddress() + "'" +
            ", description='" + getDescription() + "'" +
            ", telephoneLong='" + getTelephoneLong() + "'" +
            "}";
    }
}
