package de.wvv.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A EmployeeStyle.
 */
@Entity
@Table(name = "employee_style")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmployeeStyle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "employee_style")
    private String employeeStyle;

    @ManyToMany(mappedBy = "employeeStyles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<UserProfile> userProfiles = new HashSet<>();

    @ManyToMany(mappedBy = "employeeStyles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Offer> offers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeStyle() {
        return employeeStyle;
    }

    public EmployeeStyle employeeStyle(String employeeStyle) {
        this.employeeStyle = employeeStyle;
        return this;
    }

    public void setEmployeeStyle(String employeeStyle) {
        this.employeeStyle = employeeStyle;
    }

    public Set<UserProfile> getUserProfiles() {
        return userProfiles;
    }

    public EmployeeStyle userProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public EmployeeStyle addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.getEmployeeStyles().add(this);
        return this;
    }

    public EmployeeStyle removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.getEmployeeStyles().remove(this);
        return this;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public EmployeeStyle offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public EmployeeStyle addOffer(Offer offer) {
        this.offers.add(offer);
        offer.getEmployeeStyles().add(this);
        return this;
    }

    public EmployeeStyle removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.getEmployeeStyles().remove(this);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeStyle)) {
            return false;
        }
        return id != null && id.equals(((EmployeeStyle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EmployeeStyle{" +
            "id=" + getId() +
            ", employeeStyle='" + getEmployeeStyle() + "'" +
            "}";
    }
}
